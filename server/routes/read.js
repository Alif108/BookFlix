const router = require('express').Router();
const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");


let ReadItem = require('../models/readList.model');


//set read item
router.get("/setReadItem/:id", userAuth, function(req, res){
  //check database if document exists if not insert
  console.log(req.params.id);
  console.log(req.session.user.id);
  console.log("hey there");
  ReadItem.find({userID: req.session.user.id, bookID: req.params.id})
    .then(result => {
      if(result.length === 0){
        const readItem = new ReadItem({
          userID: req.session.user.id,
          bookID: req.params.id,
          //set start date as current date
          startDate: new Date(),
        });
        readItem.save()
          .then(() => res.json({message: "Book added to ReadList"}))
          .catch(err => res.status(400).json({message: "Error: " + err}));
      }
      else {
        res.json({message: "Book already in user's ReadList"});
      }
    }).catch(err => res.status(400).json('Error: ' + err));
});

//get read item
router.get("/getReadItem/:id", userAuth, function(req, res){
  ReadItem.findOne({userID: req.session.user.id, bookID: req.params.id})
    .populate("bookID", "pdfLocation")
    .then(result => {
      res.json(result);
      console.log("read item fetched. page num:", result.currentPage);
    }).catch(err => res.status(400).json('Error: ' + err));
}),


//save page to read list
router.post("/update/:id", userAuth, function(req, res){
  ReadItem.findOne({userID: req.session.user.id, bookID: req.params.id})
    .then(readList => {
      console.log(req.body.currentPage);
      readList.currentPage = req.body.currentPage;

      readList.save()
        .then(() => res.json({message: "Page saved"}))
        .catch(err => res.status(400).json({message: "Error: " + err}));
    }).catch(err => res.status(400).json('Error: ' + err));
}),

module.exports = router;