const router = require('express').Router();

let BookRequests = require('../models/bookRequests.model');

const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");

// add book
router.post("/", userAuth, function(req, res, next){

    console.log("Here: ");
    console.log(req.body);

    const bookRequest = new BookRequests({
        userID: req.session.user.id,
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      publishingYear: req.body.publishing_year,
      description: req.body.description,
    });

  
    // console.log(bookRequest._id);
    // console.log(req.files);
  
    bookRequest.save()
      .then(() => {
        console.log("bookRequest added");
        res.json({success: true, message: "bookRequest added"});
    })
      .catch(err => {
        console.log(err);
        res.json({success: false, message: "Error: " + err});
      });
  });


///Book Request list generation
router.get("/requests", generalAuth, function(req, res){

    if(req.session.user.role === "Admin")
    {
        BookRequests.find()
        .then(bookReqs => {
            res.json(bookReqs)
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        BookRequests.find({userID: req.session.user.id})
        .then(bookReqs => {
            res.json(bookReqs)
        }).catch(err => res.status(400).json('Error: ' + err));
    }
  });


// search book by title, author, or genre
router.get("/searchBookRequest/:query", generalAuth, function(req, res){
    BookRequests.find({ $or: [
      {title: {$regex: req.params.query, $options: 'i'}}, 
      {author: {$regex: req.params.query, $options: 'i'}},
    ]})
      .then(bookReqs => res.json(bookReqs))
      .catch(err => res.status(400).json('Error: ' + err));
  })

  module.exports = router;