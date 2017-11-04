var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ListingSchema = new Schema({ cost: Number, sqft: Number, city: String });

// Listing = Document, with object properties located in listings collection
var Listing = mongoose.model('Listing', ListingSchema, 'listings');

router.post('/', function (req, res) {
    console.log(req.body); //rental property received in addRental function
    var listingToAdd = new Listing(req.body); //renaming to work with mongoose
    listingToAdd.save(function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    }); // END SAVE
}); // END POST Route

// GET Route
router.get('/', function (req, res) {
    // Rental - Is a reference to the collection when finding things in the DB
    Listing.find({}, function (err, listingsFound) { //finding all rentals in collection
        if (err) {
            console.log("ERROR!", err);
            res.sendStatus(500);
        } else {
            res.send(listingsFound);
        }
    }); // END FIND
}); // END GET Route


// Make router available to other files
module.exports = router;