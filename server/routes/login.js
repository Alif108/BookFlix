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
let Package = require('../models/packages.model');
let Transaction = require('../models/transaction.model');

// check if the user is a subscriber or not
async function isSubscribedUser(uid)
{
    transaction = await Transaction.find({userID: uid.toString()});
    if(transaction.length > 0)
    {
        pack = await Package.findById(transaction[0].packageID);
        if(pack)
        {
            // check if subscription is expired
            dayDiff = (new Date().getTime() - new Date(transaction[0].date).getTime()) / (1000 * 3600 * 24);
            if(dayDiff < pack.duration)
                return true;
        }
    }
    return false;
}

// function for page "bookflix/login"
router.post("/login", async (req, res) => {
    try{
        User.findOne({email: req.body.email}, async function(err, data){
            if(err){
                console.log(err);
                return handleError(err);
              
                // return res.json({ status: "error", error: err, user: false} );
            }
            if(data != null){
                bcrypt.compare(req.body.password, data.password).then(async function (result)
                {
                    if(result)
                    {
                        let isSubscribed = await isSubscribedUser(data._id);
                        const payload = {id: data._id, username: data.username, role: data.role, subscription: isSubscribed};
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