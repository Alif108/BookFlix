const express = require("express");
const router = express.Router();

const {generalAuth} = require("../middleware/auth");

const navBar = (req, res) => {
    if(req.session.user)
    {
        res.json({loggedIn: true, role: req.session.user.role, username: req.session.user.username});
    }
    else
    {
        res.json({loggedIn: false, role: "", username: ""});
    }
}

router.get('/navbar', generalAuth, navBar);

module.exports = router;