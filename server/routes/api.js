const express = require('express');
const db = require("../models");

const router = new express.Router();

// matches with api/dashboard on client side
router.get('/dashboard', (req, res) => {

	db.User
		.find(req.query)
		.sort({date:-1})
		.then(dbModel => {res.json(dbModel); console.log(dbModel)})
		.catch(err => res.status(422).json(err));

  // res.status(200).json({
  // 	// corresponds to containers setState secretData: xhr.response.message
  //   message: "You're authorized to see this secret message. Which will also contain the json data sent back from DB"
  // });
});

module.exports = router;