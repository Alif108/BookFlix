const router = require('express').Router();
const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");


let ReadItem = require('../models/readList.model');
let Book = require('../models/book.model');


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

//finished reading book
router.post("/finished/:id", userAuth, function(req, res){
  ReadItem.findOne({userID: req.session.user.id, bookID: req.params.id})
    .then(readList => {
      console.log(req.body.currentPage);
      readList.isFinished = req.body.finished;

      readList.save()
        .then(() => res.json({message: "Page saved"}))
        .catch(err => res.status(400).json({message: "Error: " + err}));
    }).catch(err => res.status(400).json('Error: ' + err));
}),


//fetch all readItems for user that are not finished
router.get("/getUserReadItems", userAuth, function(req, res){
  ReadItem.find({userID: req.session.user.id, isFinished: false}) //populate whole book document
    .populate("bookID", [], Book)
    .then(result => {
      // console.log(result);
      res.json(result);
    }).catch(err => res.status(400).json('Error: ' + err));
}),


//fetch all books from the readItems and get count
router.get("/getPopularItems", userAuth, function(req, res){
  ReadItem.aggregate([
    {"$group" : {_id:"$bookID", count:{$sum:1}}},
    {$sort:{"count":-1}}
  ])
  .then(async function(objects){
    books = [];

    for(var i=0; i<objects.length; i++){
        book = await Book.findById(objects[i]._id)
          .then(book => {
            books.push(book);
          }).catch(err => res.status(400).json('Error: ' + err));
    }
    // console.log(books);
    res.json(books);
})
    .catch(err => res.status(400).json('Error: ' + err));
})


//fetch all books that have a timestamp between five days of currentdate
router.get("/getNewItems", userAuth, function(req, res){
  Book.find()
    .then(async function(result){
      bookes = [];
      for(var i=0; i<result.length; i++){
        if(result[i].timestamp > new Date(new Date().setDate(new Date().getDate() - 2))){
          bookes.push(result[i]);
        }
      }
      res.json(bookes);
    }).catch(err => res.status(400).json('Error: ' + err));
}),


module.exports = router;