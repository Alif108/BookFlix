const express = require("express");
const router = express.Router();

const {adminAuth} = require("../middleware/auth");

// the collection that will be needed
const User = require("../models/user.model");

const adminHome = (req, res) => {
    res.json({user: req.session.user});
}

router.get('/admin', adminAuth, adminHome);

module.exports = router;