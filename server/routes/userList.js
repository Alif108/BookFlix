const express = require("express");
const router = express.Router();

const {adminAuth} = require("../middleware/auth");

// the collection that will be needed
const User = require("../models/user.model");

const userlist = async (req, res) => {

  let current_user = req.session.user;
  console.log(current_user);
  await User.find()
    .then(users => res.json({users, current_user}))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
}

router.get('/admin/userlist', adminAuth, userlist);

module.exports = router;