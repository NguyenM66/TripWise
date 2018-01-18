const express = require('express');
const db = require("../models");
const passport = require('passport');
const jwt  = require('jsonwebtoken');
const config = require('../../config/keys.js');
const router = new express.Router();


router.get('/dashboard', (req, res, next) => {
  let userDBKey =  (jwt.verify(req.headers.authorization.split(' ')[1],config.mongodb.jwtSecret)).sub;
  
  db.User
    .find({"_id":userDBKey})
    .populate("trips")
    .sort({date:-1})
	.then(dbModel => {res.json(dbModel[0]); console.log(dbModel[0])})
	.catch(err => res.status(422).json(err));
});

// router.post('/expense', (req, res, next) => {
  //console.log("bearer in routes/auth", req.headers);
  // const validationResult = validateLoginForm(req.body);
  // if (!validationResult.success) {
  //   return res.status(400).json({
  //     success: false,
  //     message: validationResult.message,
  //     errors: validationResult.errors
  //   });
  // }


  // return passport.authenticate('local-login', (err, token, userData) => {
  //   if (err) {
  //     if (err.name === 'IncorrectCredentialsError') {
  //       return res.status(400).json({
  //         success: false,
  //         message: err.message
  //       });
  //     }

  //     return res.status(400).json({
  //       success: false,
  //       message: 'Could not process the form.'
  //     });
  //   }

    // console.log("userData inside routes/auth:", userData);
    // console.log("token inside routes/auth:", token);
  //   return res.json({
  //     success: true,
  //     message: 'You have successfully added a new expense!',
  //     token,
  //     user: userData
  //   });
  // })(req, res, next);
// });

// matches with api/users on client side
// route that gets all users from db
router.get('/users', (req, res) => {
	console.log("recieved get request to api users")
	db.User
		.find({})
		.sort({date:-1})
		.then(dbUser => {res.json(dbUser); console.log(dbUser)})
		.catch(err => res.status(422).json(err));
});

// matches with api/trips on client side
// route that gets all trips from db
router.get('/trips', (req, res) => {
	console.log("recieved get request to api trips")
	db.Trip
		.find({})
		.sort({date:-1})
		.then(dbTrip => {res.json(dbTrip); console.log(dbTrip)})
		.catch(err => res.status(422).json(err));
});

// matches with api/submit on client side
// route to save new Trip to the db and associating it with a User
router.post('/submit', (req, res) => {
	console.log("recieved post to api trips with associated user")
	db.Trip
		.create(req.body)
		.sort({date:-1})
		// if a Trip was create successfully, find one User and push the new Trip's _id to the User's 'trips' array
		// {new: true} tells the query that we want it to return the updated User (it returns the original by default)
		// since our mogoose query returns a promise, we can chain another '.then' whcihc recieves the result of the query
		.then(dbTrip => {
			return db.User.findOneAndUpdate({}, {$push: {trips: dbTrip._id}}, {new: true});
		})
		.then(dbUser => {res.json(dbUser); console.log(dbUser)})
		.catch(err => res.status(422).json(err));
})

// matches with api/populateduser on client side
// route that gets all users and their trips from db
router.get('/populateduser', (req, res) => {
	console.log("recieved get request to api user")
	db.User
		.find({})
		.populate("trips")
		.sort({date:-1})
		.then(dbUser => {res.json(dbUser); console.log(dbUser)})
		.catch(err => res.status(422).json(err));
});


module.exports = router;