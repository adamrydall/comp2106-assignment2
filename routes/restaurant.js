var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

// GET handler for restaurants page
router.get('/', function(req, res, next) {
    // Show all restaurants
    Restaurant.find(function (err, restaurants) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('restaurants/indexx', {
                title: 'Restaurants',
                restaurants: restaurants
            });
        }
    });
});

// Make Public
module.exports = router;
