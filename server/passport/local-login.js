const jwt = require('jsonwebtoken');
const User = require('../models/user');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config/keys');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // if user exists and the password is correct create a token string (JWT) was: config.mongodb.jwtSecret
      const token = jwt.sign(payload, process.env.jwtSecret);
      const data = {
        id: user._id,
        email: user.email,
        password: user.password,
        name: user.name
      };

      // console.log("bearer in passport local-login", req.headers);
      // console.log("user data", user);
      // console.log("token", token);
      // console.log("data", data);
      return done(null, token, data);
    });
  });
});