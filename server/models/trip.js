const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
	//_id for trip is auto generated
  token: {type: String},
  trip: {type: String, required: true},
  expenses: {type: Array},
  guests: {type: Array},
  invoices: {type: Array}
  //payerid: {type: Schema.Types.ObjectId, ref: "Guest"}
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;