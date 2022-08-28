const express = require('express');
const { fstat } = require('fs');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");

let Author = require('../models/author.model');
let Book = require('../models/book.model');

///Author list generation
router.get("/", generalAuth, function(req, res){
  Author.find()
    .then(authors => {
      res.json({user: req.session.user, authors})
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


///book profile generation
router.get("/:id", generalAuth, function(req, res){
  Author.findById(req.params.id)
    .then(author => {
        Book.find({author: req.params.id})
        .then(books => {
            console.log("Author: " + author);
            console.log("Books: " + books);
            res.json({user: req.session.user, author, books})
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// search book by title, author, or genre
router.get("/searchAuthor/:query", generalAuth, function(req, res){
  Author.find({ $or: [
    {name: {$regex: req.params.query, $options: 'i'}}, 
  ]})
    .then(authors => res.json(authors))
    .catch(err => res.status(400).json('Error: ' + err));
})


///File upload + database insertion
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/authors/');
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
  })

const upload = multer({ storage: storage });

// add book
router.post("/add", upload.any(), function(req, res, next){

  const author = new Author({
    name: req.body.name,
    description: req.body.description,
  });

  const photoDest = '/authors/'+req.body.name + "." + req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1];

  author.photoLocation = photoDest;

  author.save()
    .then(() => {
        res.json({success: true, message: "Author added successfully"});
    })
    .catch(err => {
        res.status(400).json({success: false, message: 'Error: ' + err});
    });
});


///book update
router.route('/update/:id').post((req, res) => {
//   console.log(res.body);
//   Book.findById(req.params.id)
//     .then(book => {
//       console.log(req.body);
//       book.title = req.body.title;
//       book.isbn = req.body.isbn;
//       book.author = req.body.author;
//       book.publisher = req.body.publisher;
//       book.year = req.body.year;
//       book.genre = req.body.genre;
//       book.numPage = req.body.numPage;
//       book.description = req.body.description;

//       book.save()
//         .then(() => res.json('Book updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
});

///delete book
router.route('/remove/:id').delete((req, res) => {
//   let coverDest = "ss";
//   let pdfDest = "ss";
//   Book.findById(req.params.id)
//     .then(book => {
//       coverDest = book.coverLocation;
//       pdfDest = book.pdfLocation;
//       book.remove()
//         .then(() => {
//           fs.unlink(path.join(__dirname, '../files'+coverDest), (err) => {
//             if (err) throw err;
//             console.log('successfully deleted cover');
//           }),
//           fs.unlink(path.join(__dirname, '../files'+pdfDest), (err) => {
//             if (err) throw err;
//             console.log('successfully deleted pdf');
//           }),
//           res.json('Book deleted!')
//         }).catch(err => res.status(400).json('Error: ' + err));
//     }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;