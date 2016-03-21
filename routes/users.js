var express = require('express');
var router = express.Router();
var Account = require('../models/account');
//var mongoose = require('mongoose');
//var Article = require('../models/users');
//var passport = require('passport');

///* GET users listing. */
//router.get('/', function(req, res, next) {
//
//  //res.send('respond with a resource');
//
//    var usernames = ['Me', 'You', 'Them'];
//
//    // show the users.ejs view in the browser
//    res.render('users', { title: 'Users',
//                         users: usernames });
//});

    //show users that are in database
// set up the GET handler for the main articles page
router.get('/', function(req, res, next) {
    // use the Article model to retrieve all articles
    Account.find(function (err, accounts) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('users', {

                title: 'Users',
                user: accounts
            });
        }
    });
});

//auth check
//function isLoggedIn(req, res, next) {
//    //is the user authenticated>
//    if (req.isAuthenticated()) {
//        return next;
//    }
//    else {
//        res.redirect('/auth/login');
//    }
//}



module.exports = router;
