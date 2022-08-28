const express = require('express');
const { fstat } = require('fs');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");

let Book = require('../models/book.model');
let Review = require('../models/review.model');
let User = require('../models/user.model');
let MyList = require('../models/mylist.model');
let Genre = require('../models/genre.model');
let ReadItem = require('../models/readList.model');

///Book list generation
router.get("/", generalAuth, function(req, res){
  Book.find()
    .populate('genre', "name")
    .then(books => {
      console.log(books);
      res.json(books)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


///book profile generation
router.get("/:id", generalAuth, function(req, res){
  Book.findById(req.params.id)
    .then(book => {
      Genre.findById(book.genre)
        .then(genre => {
          ReadItem.findOne({userID: req.session.user.id, bookID: req.params.id})
          .then(readItem =>{
            res.json({user: req.session.user, book, genre, readItem})
          })
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// search book by title, author, or genre
router.get("/searchBook/:query", generalAuth, function(req, res){
  Book.find({ $or: [
    {title: {$regex: req.params.query, $options: 'i'}}, 
    {author: {$regex: req.params.query, $options: 'i'}},
    // {genre: {$regex: req.params.query, $options: 'i'}}
  ]})
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

///adding review
router.post ("/addReview", generalAuth, function(req, res, next){
  const review = new Review({
    bookID: req.body.bookID,
    userID: req.body.userID,
    rating: req.body.rating,
    description: req.body.description,
    timestamp: new Date(),
  });

  review.save();
  res.json({message: "Review added successfully"});
})


///Fetching Review
router.get("/reviews/:id", generalAuth, function(req, res, next){
  //for each review get username too
  Review.find({bookID: req.params.id})
  .populate('userID', "username")
  .then(reviews => {
    res.json(reviews);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

///File upload + database insertion
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname === 'cover'){
        cb(null, './files/covers/');
      } else if(file.fieldname === 'pdf'){
        cb(null, './files/pdfs/');
      }
    },
    filename: function (req, file, cb) {

      cb(null, req.body.title+"_"+req.body.year+'.'+file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
  })

const upload = multer({ storage: storage });

// add book
router.post("/add", upload.any(), function(req, res, next){

  const book = new Book({
    title: req.body.title,
    isbn: req.body.isbn,
    author: req.body.author,
    publisher: req.body.publisher,
    publishingYear: req.body.year,
    genre: req.body.genre,
    numPage: req.body.numPage,
    description: req.body.description,
  });

  const coverDest = '/covers/'+req.body.title+"_"+req.body.year
    +"."+req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1];

  const pdfDest = '/pdfs/'+req.body.title+"_"+req.body.year
    +"."+req.files[1].originalname.split('.')[req.files[1].originalname.split('.').length - 1];

  book.coverLocation = coverDest;
  book.pdfLocation = pdfDest;

  book.save()
    .then(() => {console.log("Book added");})
    .catch(err => console.log(err));
});


///book update
router.route('/update/:id').post((req, res) => {
  console.log(res.body);
  Book.findById(req.params.id)
    .then(book => {
      console.log(req.body);
      book.title = req.body.title;
      book.isbn = req.body.isbn;
      book.author = req.body.author;
      book.publisher = req.body.publisher;
      book.year = req.body.year;
      book.genre = req.body.genre;
      book.numPage = req.body.numPage;
      book.description = req.body.description;

      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

///delete book
router.route('/remove/:id').delete((req, res) => {
  let coverDest = "ss";
  let pdfDest = "ss";
  Book.findById(req.params.id)
    .then(book => {
      coverDest = book.coverLocation;
      pdfDest = book.pdfLocation;
      book.remove()
        .then(() => {
          fs.unlink(path.join(__dirname, '../files'+coverDest), (err) => {
            if (err) throw err;
            console.log('successfully deleted cover');
          }),
          fs.unlink(path.join(__dirname, '../files'+pdfDest), (err) => {
            if (err) throw err;
            console.log('successfully deleted pdf');
          }),
          res.json('Book deleted!')
        }).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});


// add to my list
router.post("/addToMyList/:id", userAuth, async function(req, res){

  result = await MyList.find({userID: req.session.user.id, bookID: req.params.id});
  if(result.length !== 0){
    res.json({message: "Book already in your list"});
  } 
  else {
    const mylist = new MyList({
      bookID: req.params.id,
      userID: req.session.user.id,
    });
    mylist.save()
      .then(() => res.json({message: "Book added to MyList"}))
      .catch(err => res.status(400).json({message: "Error: " + err}));
  }
});

///Book list generation
router.get("/user/getMyList", userAuth, async function(req, res){

  MyList.find({userID: req.session.user.id})
      .then(async function(objects){
        books = [];

        for(var i=0; i<objects.length; i++){
            book = await Book.findById(objects[i].bookID).populate('genre', "name");
            // book = await Book.findById(objects[i].bookID);
            books.push(book);
        }
        console.log(books);
        res.json(books);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


///delete books from my list
router.delete("/removeMyList/:id", userAuth, function(req, res){
  MyList.findOneAndDelete({bookID: req.params.id, userID: req.session.user.id})
    .then(() => res.json({success: true, message: "Book removed from MyList"}))
    .catch(err => res.status(400).json({success: false, message: "Book colud not be removed from MyList"}));
});


router.get("/genres/getGenres", adminAuth, function(req, res){
  Genre.find()
    .then(genre => {
      res.json(genre);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;