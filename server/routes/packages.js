const router = require('express').Router();

const {generalAuth, adminAuth, userAuth} = require("../middleware/auth");

let Package = require('../models/packages.model');
let Transaction = require('../models/transaction.model');

///Package list generation
router.get("/", generalAuth, function(req, res){
  Package.find()
    .then(packages => res.json({user: req.session.user, packages}))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get package by id
router.get("/:id", generalAuth, function(req, res){
  Package.findById(req.params.id)
    .then(pack => res.json({user: req.session.user, pack}))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get("/user/myPackage", userAuth, function(req, res){
  Transaction.find({userID: req.session.user.id})
    .then(transaction => 
      {
        Package.findById(transaction[0].packageID)
          .then(package => {
            timeSinceSub = Math.ceil((new Date().getTime() - new Date(transaction[0].date).getTime()) / (1000 * 3600 * 24)); // time since subscription (days)
            expiresIn = package.duration - timeSinceSub; // time until subscription expires (days)
            res.json({user: req.session.user, package, expiresIn});
          })
          .catch(err => res.status(400).json('Error: ' + err));
      })
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
router.delete("/remove/:id", adminAuth, function(req, res){
  Package.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add package
router.post("/addPackage", adminAuth, function(req, res){

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

// subscription
router.post("/getPackage/:id", userAuth, function(req, res){

  // console.log(req.session.user);

  if(req.session.user.subscription)
  {
    return res.json({success: false, message: "You already have a subscription"});
  }
  else
  {
    const user_ID = req.body.user_ID;
    const package_ID = req.body.package_ID;
    const amount = req.body.amount;
    const name = req.body.name;
    const contact = req.body.contact;
    const bkash = req.body.bkash;
    const address = req.body.address;

    const transaction = new Transaction({
      userID: user_ID,
      packageID: package_ID,
      amount: amount,
      date: new Date(),
      subscriber_name: name,
      contact_number: contact,
      bkash_number: bkash,
      address: address,
    });

    transaction.save()
    .then(() => {
      req.session.user.subscription = true;
      // console.log(req.session.user);
      res.json({success: true, message: "Subscription Successful"});
    })
    .catch(err => {
      res.json({success: false, message: "Subscription failed"});
    });
  }
});

module.exports = router;