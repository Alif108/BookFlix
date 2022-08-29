const router = require('express').Router();
const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");

let Book = require('../models/book.model');
let ReadItem = require('../models/readList.model');
let Transaction = require('../models/transaction.model');
// get with query

router.get('/popularity/books', adminAuth, async (req, res) => {
  // aggrerate by book id and count the number of times a book is read from date to date
  ReadItem.aggregate([
    {"$match": {startDate: {$gte: new Date(req.query.fromDate), $lte: new Date(req.query.toDate)}}},
    {"$group" : {_id:"$bookID", count:{$sum:1}}},
    {$sort:{"count":-1}},
    {$lookup: {from: "books", localField: "_id", foreignField: "_id", as: "book"}}
  ])
  .then(result => {
    res.json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
}),

router.get('/popularity/authors', adminAuth, async (req, res) => {
  // aggrerate by author id and count the number of times a book is read from date to date
  ReadItem.aggregate([
    {"$match": {startDate: {$gte: new Date(req.query.fromDate), $lte: new Date(req.query.toDate)}}},
    {"$lookup": {from: "books", localField: "bookID", foreignField: "_id", as: "book"}},
    {"$unwind": "$book"},
    {"$group" : {_id:"$book.author", count:{$sum:1}}},
    {$sort:{"count":-1}},
    {$lookup: {from: "authors", localField: "_id", foreignField: "_id", as: "author"}}
  ])
  .then(result => {
    res.json(result);
  }).catch(err => res.status(400).json('Error: ' + err));
}),


router.get('/popularity/packages', adminAuth, async (req, res) => {
  // aggrerate by package id and count the number of times a book is read from date to date
  Transaction.aggregate([
    {"$match": {date: {$gte: new Date(req.query.fromDate), $lte: new Date(req.query.toDate)}}},
    {"$lookup": {from: "packages", localField: "packageID", foreignField: "_id", as: "package"}},
    {"$unwind": "$package"},
    {"$group" : {_id:"$package._id", count:{$sum:1}}},
    {$sort:{"count":-1}},
    {$lookup: {from: "packages", localField: "_id", foreignField: "_id", as: "package"}}
  ])
  .then(result => {
    res.json(result);
  }).catch(err => res.status(400).json('Error: ' + err));
}),



module.exports = router;