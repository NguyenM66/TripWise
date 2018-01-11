const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message. Which will also contain the json data sent back from DB"
  });
});

module.exports = router;