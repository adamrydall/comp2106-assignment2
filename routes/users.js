var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

/* GET users listing.
router.get('/', function(req, res, next) {

  //res.send('respond with a resource');
    
    var usernames = ['Me', 'You', 'Them'];
    
    // show the users.ejs view in the browser
    res.render('users', { title: 'Users',
                         users: usernames });
});

*/

// set up the GET handler for the main restaurants page
router.get('/', function(req, res, next) {
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
            res.render('restaurants/indexx', {

                title: 'Restaurants',
                restaurants: restaurants
            });
        }
    });
});



module.exports = router;
