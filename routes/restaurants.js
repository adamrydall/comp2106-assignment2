var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
var passport = require('passport');

// GET handler for the main restaurants page
router.get('/', isLoggedIn, function(req, res, next) {
    // Model to retrieve all restaurants
    Restaurant.find(function (err, restaurants) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('restaurants/index', {
                title: 'Restaurants',
                restaurants: restaurants
            });
        }
    });
});

// GET handler for add
router.get('/add', isLoggedIn, function(req, res, next) {

    res.render('restaurants/add', {
        title: 'Add A Restaurant'
    });
});

// POST handler
router.post('/add', isLoggedIn, function(req, res, next) {

    // save the restaurant
    Restaurant.create({
        founded: req.body.founded,
        RestaurantName: req.body.RestaurantName,
        about: req.body.about,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website
    });

    // redirect
    res.redirect('/restaurants');
});

// GET handler to show existing data
router.get('/:id', isLoggedIn, function(req, res, next) {
   // Store the id from the url
    var id = req.params.id;

    // Use selected restaurant
    Restaurant.findById(id,  function(err, restaurant) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // Edit view
           res.render('restaurants/edit', {
               title: 'Restaurant Details',
               restaurant: restaurant
           });
       }
    });
});

// POST handler
router.post('/:id', isLoggedIn, function(req, res, next) {
    // Store the id from the url
    var id = req.params.id;

    // fill the scheme
    var restaurant = new Restaurant( {
        _id: id,
        RestaurantName: req.body.RestaurantName,
        about: req.body.about,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website
    });

    // Update the data
    Restaurant.update( { _id: id }, restaurant,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/restaurants');
        }
    });
});

// GET handler using ID
router.get('/delete/:id', isLoggedIn, function(req, res, next) {
   // Use the ID from url
    var id = req.params.id;

    console.log('trying to delete');

    Restaurant.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show restaurants list
            res.redirect('/restaurants');
        }
    });
});

// auth check function
function isLoggedIn(req, res, next) {
    // Check user status
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// make public
module.exports = router;
