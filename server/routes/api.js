const express = require('express');
const db = require("../models");
const passport = require('passport');
const jwt  = require('jsonwebtoken');

const router = new express.Router();

// router.get('/dashboard', passport.authenticate('jwt', {session: false}), function(req, res) {
// 	console.log("you can't see this without a token", users[req.user.id]);
// 	var token= getToken(req.headers);
// 		if(token){
// 			User.find(function(err, users) {
// 				if(err) return next(err);
// 				res.json(users);
// 			});
// 		}else {
// 			return res.status(403).send({success: false, msg: 'Unauthorized'});
// 		}
// });

router.get('/dashboard', (req, res, next) => {
	var token= getToken(req.headers);
  return passport.authenticate('local-login', (err, token, userData) => {
 
    console.log("userData inside routes/api:", userData);
    console.log("token inside routes/api:", token);
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});


// matches with api/dashboard on client side
// router.get('/dashboard', (req, res) => {
// 	// passport.authenticate('local-login', (err, token, userData) => {
// 	// console.log("trying to get user data", req.session.passport.user);
// 	// console.log("userData inside routes/api:", userData);
//     // console.log("token inside routes/api:", token);
// 	// })(req,res);
// 	console.log("recieved get request to api dashboard")
// 	console.log("requser:", req.user)
// 	db.User
// 		.find({})
// 		.sort({date:-1})
// 		.then(dbModel => {res.json(dbModel); console.log(dbModel)})
// 		.catch(err => res.status(422).json(err));
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
// route that gets all trips from db
router.get('/populateduser', (req, res) => {
	console.log("recieved get request to api trips")
	db.User
		.find({})
		.populate("trips")
		.sort({date:-1})
		.then(dbUser => {res.json(dbUser); console.log(dbUser)})
		.catch(err => res.status(422).json(err));
});


module.exports = router;