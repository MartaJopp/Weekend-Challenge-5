var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalSchema = new Schema({ rent: Number, sqft: Number, city: String });

// Rental = docuemnt, with these properties located in rentals collection
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');


// Make router available to other files
module.exports = router;
