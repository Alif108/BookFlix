const express = require("express");
const router = express.Router();

const {userAuth} = require("../middleware/auth");

// the collection that will be needed
const User = require("../models/user.model");

const userProfile = (req, res) => {
    res.json({user: req.session.user});
}

router.get('/user/profile', userAuth, userProfile);

module.exports = router;