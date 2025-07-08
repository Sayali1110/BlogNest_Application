const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Home of Blognest API');
});

module.exports = router;