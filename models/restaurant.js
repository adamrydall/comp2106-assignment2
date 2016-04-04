// link to mongoose
var mongoose = require('mongoose');

// define the article schema
var restaurantSchema = new mongoose.Schema({
    founded: {
        type: Date,
        default: Date.now
    },
    RestaurantName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name is required and cannot be blank.'
    },
    about: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    }
});

// make it public
module.exports = mongoose.model('Restaurant', restaurantSchema);
