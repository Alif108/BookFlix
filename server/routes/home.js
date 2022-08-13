const express = require("express");
const router = express.Router();

const {userAuth} = require("../middleware/auth");

// the collection that will be needed
const User = require("../models/user.model");

const home = (req, res) => {
    res.json({user: req.session.user});
}

router.get('/home', userAuth, home);

module.exports = router;