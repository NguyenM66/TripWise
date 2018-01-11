// const mongoose = require('mongoose');

// module.exports.connect = (uri) => {
//   mongoose.connect(uri);
//   // plug in the promise library:
//   mongoose.Promise = global.Promise;


//   mongoose.connection.on('error', (err) => {
//     console.error(`Mongoose connection error: ${err}`);
//     process.exit(1);
//   });

module.exports = {
  // load models
  User: require('./user.js'),
  Trip: require('./trip.js')
};