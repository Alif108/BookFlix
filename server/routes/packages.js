const express = require('express');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const {generalAuth, adminAuth} = require("../middleware/auth");

let Package = require('../models/packages.model');

///Package list generation
router.get("/", generalAuth, function(req, res){
  Package.find()
    .then(packages => res.json({user: req.session.user, packages}))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get package by id
router.get("/:id", function(req, res){
  Package.findById(req.params.id)
    .then(pack => res.json({user: req.session.user, pack}))
    .catch(err => res.status(400).json('Error: ' + err));
});


///book update
router.route('/update/:id').post((req, res) => {
  console.log(req.body);
  Package.findById(req.params.id)
    .then(package => {
      console.log(req.body);
      package.plan_name = req.body.plan_name;
      package.price = req.body.price;
      package.duration = req.body.duration;
      package.max_books_limit = req.body.max_books_limit;

      package.save()
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


///delete package
// router.route('/remove/:id').delete((req, res) => {
router.delete("/remove/:id", adminAuth, function(req, res){
  Package.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", adminAuth, function(req, res){

  const plan_name = req.body.plan_name;
  const price = req.body.price;
  const duration = req.body.duration;
  const max_books_limit = req.body.max_books_limit;
  
  const package = new Package({
    plan_name: plan_name,
    price: price,
    duration: duration,
    max_books_limit: max_books_limit,
  });

  package.save()
    .then(() => {
        console.log("Package added");
        res.json({success: true});
    })
    .catch(err => console.log(err));
});

module.exports = router;