var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Good Eats | Find Good Food Near You'
  });
});

// Make Public
module.exports = router;
