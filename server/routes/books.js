const express = require('express');
const router = require('express').Router();
const multer = require('multer');
let Book = require('../models/book.model');

const app = express();

const upload = multer();

const fileUpload = upload.fields([{name: 'cover', maxCount: 1}, {name:'pdf', maxCount: 1}])
router.post("/add", fileUpload, function(req, res, next){

  const title = req.body.title;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const year = req.body.year;
  const genre = req.body.genre;
  const numPage = req.body.numPage;
  const description = req.body.description;
  const cover = req.files['cover'][0];
  const pdf = req.files['pdf'][0];

  res.send('Success');
  
});

module.exports = router;