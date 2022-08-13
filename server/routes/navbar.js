const express = require("express");
const router = express.Router();

const {generalAuth} = require("../middleware/auth");

const navBar = (req, res) => {
    console.log(req.session.user);
    if(req.session.user)
        res.json({user: true, role: req.session.user.role, username: req.session.user.username});
    else
        res.json({user: false, role: "", username: ""});
}

router.get('/navbar', generalAuth, navBar);

module.exports = router;