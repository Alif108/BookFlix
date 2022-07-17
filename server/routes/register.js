const express = require('express');

// Authenticate Users with JSON Web Token
const jwt = require('jsonwebtoken');
const jwtSecret = "BOOKFLIX";

// for hashing passwords
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /register
const router = express.Router();

// the collection that will be needed
const User = require("../models/user.model");

// function for page "bookflix/register"
// router.route("/register").post(function (req, res) {
router.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if(err) throw err;
        else {
            try
            {
                const user = User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    date_of_birth: req.body.birthday,
                    gender: req.body.gender,
                    region: req.body.region,
                });

                const token_age = 3 * 60 * 60;
                const token = jwt.sign(
                    {id: user._id, username: user.username, role: user.role},
                    jwtSecret,
                    {expiresIn: token_age}
                );

                // After the token is generated, send it as a cookie to the client
                // res.cookie("jwt", token, {
                //     httpOnly: true,
                //     maxAge: token_age * 1000, // 3hrs in ms
                // });
                res.status(201).json({
                    message: "User successfully Registered",
                    user: user._id,
                    token
                  });
            }
            catch(err)
            {
                res.status(400).json({ message: "Login not succesful", user: false });
            }
        }
    });
});

module.exports = router;