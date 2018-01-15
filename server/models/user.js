const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the User model schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  // 'trips' is an array that stores ObjectIds
  //  the ref property links these ObjectIds to the Trip model
  //  this allows us to populate the User with any associated Trips
  trips: [
    {
      // store ObjectIds in the array
      type: mongoose.Schema.Types.ObjectId,
      // the ObjectIds will refer to the ids in the Trip model
      ref: "Trip"
    }
  ]
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
userSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;