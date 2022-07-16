const express = require('express');
const router = require('express').Router();
const multer = require('multer');
let Book = require('../models/book.model');

const app = express();



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

router.post("/add", upload.any(), function(req, res, next){

  const title = req.body.title;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const year = req.body.year;
  const genre = req.body.genre;
  const numPage = req.body.numPage;
  const description = req.body.description;

  const book = new Book({
    title: title,
    isbn: isbn,
    author: author,
    publisher: publisher,
    publishingYear: year,
    genre: genre,
    numPage: numPage,
    description: description,
  });

  const coverDest = './files/covers/'
    +req.body.title+"_"+req.body.year
    +"."+req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1];

  const pdfDest = './files/pdfs/'
    +req.body.title+"_"+req.body.year
    +"."+req.files[1].originalname.split('.')[req.files[1].originalname.split('.').length - 1];

  book.coverLocation = coverDest;
  book.pdfLocation = pdfDest;

  console.log(book._id);
  console.log(req.files);

  book.save()
    .then(() => {console.log("Book added");})
    .catch(err => console.log(err));
});

module.exports = router;