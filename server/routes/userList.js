const express = require("express");
const router = express.Router();

const {adminAuth} = require("../middleware/auth");

// the collection that will be needed
const User = require("../models/user.model");

// router.get("/profile", (req, res) => {
//         // return res.json({data: "OK"});
//         User.find({}, function (err, result) {
//                 if (err) throw err;
//                 res.json(result);
//               });
// });

router.get('/userlist', adminAuth, (req, res) => {
        User.find()
          .then(users => res.json(users))
          .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
      });

module.exports = router;