// link to mongoose
var mongoose = require('mongoose');

// define the schema for M-Labs
var restaurantSchema = new mongoose.Schema({
    founded: {
        type: Date,
        default: Date.now
    },
    RestaurantName: {
        type: String,
        default: '',
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
    //img: {
    //    data: Buffer,
    //    contentType: String
    //}
});

// Make public
module.exports = mongoose.model('Restaurant', restaurantSchema);
