const express = require('express');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

let Book = require('../models/book.model');

const app = express();
app.use(express.static('files'));

///Book list generation
router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});


///book profile generation
router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
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

  const coverDest = '/covers/'+req.body.title+"_"+req.body.year
    +"."+req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1];

  const pdfDest = '/pdfs/'+req.body.title+"_"+req.body.year
    +"."+req.files[1].originalname.split('.')[req.files[1].originalname.split('.').length - 1];

  book.coverLocation = coverDest;
  book.pdfLocation = pdfDest;

  console.log(book._id);
  console.log(req.files);

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

module.exports = router;