var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ListingSchema = new Schema({ cost: Number, sqft: Number, city: String });

// Listing = Document, with object properties located in listings collection
var Listing = mongoose.model('Listing', ListingSchema, 'listings');




// Make router available to other files
module.exports = router;