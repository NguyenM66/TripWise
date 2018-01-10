const mongoose = require('mongoose');
const db = require('../server/models');
const keys = require('../config/keys');
mongoose.Promise = global.Promise;

//connect to mongodb
mongoose.connect(keys.mongodb.dbUri, () => {
  console.log('connected to mongodb');
})

const tripSeed = [
  {
    token: "",
    trip: "Scalloping",
    expenses: [
      {
        title: "House",
        cost: 1500,
      },
      {
        title: "Car",
        cost: 300,
      }
    ],
    guests: [
      {
        name: "Monica",
        email: "monica.nguyen@gmail.com"
      },
      {
        name: "Billy",
        email: "william.reed.11@gmail.com"
      },
      {
        name: "David",
        email: "davidpadams@gmail.com"
      }
    ],
    invoices: [],
    //date: new Date(Date.now())
  },
  {
    token: "",
    trip: "Gennie Springs",
    expenses: [
      {
        title: "House",
        cost: 1500,
      },
      {
        title: "Car",
        cost: 300,
      }
    ],
    guests: [
        {
          name: "Monica",
          email: "monica.nguyen@gmail.com"
        },
        {
          name: "Billy",
          email: "william.reed.11@gmail.com"
        },
        {
          name: "David",
          email: "davidpadams@gmail.com"
        }
      ],
    invoices: [],
  }
];

db.Trip
.remove({})
.then(() => db.Trip.insertMany(tripSeed))
.then(function(tripdata){
  console.log("data", tripdata);
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
