const express = require('express');

// jsonwebtokens are used for sign in. The payload in base64
// encoded between the two dots
// e.g.  "sth.payload.sth" 
// Authenticate Users with JSON Web Token
const jwt = require('jsonwebtoken');
const jwtSecret = "BOOKFLIX";

// for hashing passwords
const bcrypt = require('bcryptjs');

// registerRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /register
const router = express.Router();

// the collection that will be needed
const User = require("../models/user.model");

// function for page "bookflix/login"
router.post("/login", (req, res) => {
    try{
        User.findOne({email: req.body.email}, function(err, data){
            if(err){
                console.log(err);
                return handleError(err);
                // return res.json({ status: "error", error: err, user: false} );
            }
            if(data != null){

                bcrypt.compare(req.body.password, data.password).then(function (result)
                {
                    if(result)
                    {
                        const payload = {id: data._id, username: data.username, role: data.role};
                        const token_age = 3 * 60 * 60; // 3hrs in sec

                        const token = jwt.sign(
                            payload,
                            jwtSecret,
                            {expiresIn: token_age} 
                        );

                        console.log("Login successful");
                        res.status(201).json({message: "User successfully Logged in", user: data, token});
                    }
                    else{
                        console.log("Password does not match");
                        res.status(400).json({ message: "Login not succesful", user: false });
                    }
                })
            }
            else{
                console.log("User not found");
                res.status(400).json({ message: "Login not succesful", user: false });
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({ message: "An error occurred", user: false });
    };
});

module.exports = router;