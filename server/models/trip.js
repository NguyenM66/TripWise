const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
	//_id for trip is auto generated
  token: {
  	type: String
  },
  trip: {
  	type: String, 
  	required: true
  },
  expenses: {
  	type: Array
  },
  guests: {
  	type: Array
  },
  invoices: {
  	type: Array
  }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;