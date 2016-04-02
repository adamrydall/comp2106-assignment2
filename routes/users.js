var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/article');

/* GET users listing.
router.get('/', function(req, res, next) {

  //res.send('respond with a resource');
    
    var usernames = ['Me', 'You', 'Them'];
    
    // show the users.ejs view in the browser
    res.render('users', { title: 'Users',
                         users: usernames });
});

*/

// set up the GET handler for the main articles page
router.get('/', function(req, res, next) {
    // use the Article model to retrieve all articles
    Article.find(function (err, articles) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('articles/indexx', {

                title: 'Articles',
                articles: articles
            });
        }
    });
});


// GET handler for edit to show the populated form
router.get('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Article.findById(id, function(err, article) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('articles/show', {
                title: 'Article Details',
                article: article
            });
        }
    });
});
module.exports = router;
