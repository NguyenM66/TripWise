const express = require('express');
const db = require("../models");
const passport = require('passport');
const jwt  = require('jsonwebtoken');
const config = require('../../config/keys.js');
const router = new express.Router();


router.get('/dashboard', (req, res, next) => {
	//was: config.mongodb.jwtSecret
  let userDBKey = (jwt.verify(req.headers.authorization.split(' ')[1],process.env.jwtSecret || config.mongodb.jwtSecret)).sub;
  
  db.User
    .find({"_id":userDBKey})
    .populate("trips")
    .sort({date:-1})
	.then(dbModel => {res.json(dbModel[0]); console.log(dbModel[0])})
	.catch(err => res.status(422).json(err));
});

router.post('/trip', (req, res, next) => {
	console.log("recieved post to api trips with associated user")
	db.Trip
		.create(req.body)
		// if a Trip was create successfully, find one User and push the new Trip's _id to the User's 'trips' array
		// {new: true} tells the query that we want it to return the updated User (it returns the original by default)
		// since our mogoose query returns a promise, we can chain another '.then' whcihc recieves the result of the query
		.then(dbTrip => {
			return db.User.findOneAndUpdate({"_id": req.body.currentUser}, {$push: {trips: dbTrip._id}}, {new: true});
		})
		.then(dbTrip => {res.json(dbTrip); console.log("dbTrip", dbTrip)})
		.catch(err => res.status(422).json(err));
})


router.post('/expense', (req, res, next) => {

	db.Trip
		.find({"_id": req.body.currentTrip})
		.then(dbTripExpense => {
			return db.Trip.findOneAndUpdate({"_id": req.body.currentTrip}, {$push: {expenses: req.body}}, {new: true});
		})
		.then(dbTripExpense => {res.json(dbTripExpense); console.log("dbTripExpense", dbTripExpense)})
		.catch(err => res.status(422).json(err));
		//console.log("req.body", req.body)
});

router.post('/guest', (req, res, next) => {

	db.Trip
		.find({"_id": req.body.currentTrip})
		.then(dbTripGuest => {
			return db.Trip.findOneAndUpdate({"_id": req.body.currentTrip}, {$push: {guests: req.body}}, {new: true});
		})
		.then(dbTripGuest => {res.json(dbTripGuest); console.log("dbTripGuest", dbTripGuest)})
		.catch(err => res.status(422).json(err));
		//console.log("req.body", req.body)
});

router.put('/update', (req, res, next) => {
	if(req.body.currentArray === "expenses"){
		db.Trip
		.findById({"_id": req.body.currentTrip})
		.then(dbItem => {
			// update array with removed item
			console.log("dbItem", dbItem)
			console.log("req.body", req.body)
			const array = dbItem.expenses
			const index = req.body.deleteIndex
			console.log("array", array)
			array.splice(index, 1)
			console.log("array", array);
			// update database with update array
			return db.Trip.update({"_id": req.body.currentTrip}, {"expenses": array});
		})
		.then(dbItem => {res.json(dbItem); console.log("dbItem", dbItem)}
			)
		.catch(err => res.status(422).json(err));
	}
	else if (req.body.currentArray === "guests") {
		db.Trip
		.findById({"_id": req.body.currentTrip})
		.then(dbItem => {
			// update array with removed item
			console.log("dbItem", dbItem)
			console.log("req.body", req.body)
			const array = dbItem.guests
			const index = req.body.deleteIndex
			console.log("array", array)
			array.splice(index, 1)
			console.log("array", array);
			// update database with update array
			return db.Trip.update({"_id": req.body.currentTrip}, {"guests": array});
		})
		.then(dbItem => {res.json(dbItem); console.log("dbItem", dbItem)}
			)
		.catch(err => res.status(422).json(err));
	}
		
})

router.delete('/delete', (req, res, next) => {
	db.Trip
	.findById({"_id": req.body.currentTrip})
	.then(dbModel => {
		console.log("req.body", req.body)
		// update database with deleted trip
		dbModel.remove();
	})
	.then(dbModel => {res.json(dbModel); console.log("dbModel", dbModel)}
		)
	.catch(err => res.status(422).json(err));
})

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
		// if a Trip was created successfully, find one User and push the new Trip's _id to the User's 'trips' array
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