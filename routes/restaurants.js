var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
var passport = require('passport');

// set up the GET handler for the main restaurants page
router.get('/', isLoggedIn, function(req, res, next) {
    // use the Article model to retrieve all restaurants
    Restaurant.find(function (err, restaurants) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('restaurants/index', {

                title: 'Restaurants',
                restaurants: restaurants
            });
        }
    });
});

// GET handler for add to display a blank form
router.get('/add', isLoggedIn, function(req, res, next) {

    res.render('restaurants/add', {
        title: 'Add a New Article'
    });
});

// POST handler for add to process the form
router.post('/add', isLoggedIn, function(req, res, next) {

    // save a new article using our Article model and mongoose
    Restaurant.create({
        founded: req.body.founded,
        RestaurantName: req.body.RestaurantName,
        about: req.body.about,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website
    });

    // redirect to main restaurants page
    res.redirect('/restaurants');
});

// GET handler for edit to show the populated form
router.get('/:id', isLoggedIn, function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Restaurant.findById(id,  function(err, restaurant) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('restaurants/edit', {
               title: 'Restaurant Details',
               restaurant: restaurant
           });
       }
    });
});

// POST handler for edit to update the article
router.post('/:id', isLoggedIn, function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the article object
    var restaurant = new Restaurant( {
        _id: id,
        RestaurantName: req.body.RestaurantName,
        about: req.body.about,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website
    });

    // use mongoose and our Article model to update
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

// GET handler for delete using the article id parameter
router.get('/delete/:id', isLoggedIn, function(req, res, next) {
   // grab the id parameter from the url
    var id = req.params.id;

    console.log('trying to delete');

    Restaurant.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated restaurants list
            res.redirect('/restaurants');
        }
    });
});

// auth check
function isLoggedIn(req, res, next) {

    // is the user authenticated?
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// make public
module.exports = router;
