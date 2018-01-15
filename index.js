const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/keys');


// // connect to the database and load models
// require('./server/models').connect(config.mongodb.dbUri);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
//connect to mongodb
mongoose.connect(config.mongodb.dbUri, () => {
	console.log('connected to mongodb');
})

// require all models
require('./server/models');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
// authCheckMiddleware applied before declaring "/api" routes
// to ensure that middleware fucntion is executed before proceeding to any /api route.
// commenting this out should make everything public
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use(function(err,req,res,next){
	console.log(err)
	res.status(500).send(err.message)
})


// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});