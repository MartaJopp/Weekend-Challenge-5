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
    console.log(listingToAdd);
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
    Listing.find({}).sort({ cost: 1 }).exec(function (err, listingsFound) { //finding all rentals in collection
        if (err) {
            console.log("ERROR!", err);
            res.sendStatus(500);
        } else {
            res.send(listingsFound);
        }
    }); // END FIND
}); // END GET Route

router.delete('/:id', function (req, res) {
    var listingId = req.params.id;
    Listing.findByIdAndRemove({ "_id": listingId }, function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}); // END DELETE Route

// Search get route
// Search by City get route
router.get('/searchCity/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    Listing.find({ "city": { "$regex": keyword, "$options": "i" } }, function (err, listingsFound) {
        if (err) {
            console.log("Error!", err);
            res.sendStatus(500);
        } else {
            res.send(listingsFound);
        }
    });
})//end search by City GET route

//search by Square Footage Get Route
router.get('/searchSqft/:keyword', function (req, res) {
    var keyword = parseInt(req.params.keyword);
    console.log('Should be Square Feet', req.params.keyword);
    Listing.find({ sqft: { $gte: keyword } }).sort({ cost: 1 }).exec(function (err, listingsFound) {
        if (err) {
            console.log("Error!", err);
            res.sendStatus(500);
        } else {
            res.send(listingsFound);
        }
    });
})//end search by Square Footage GET route

//search by Price Get Route
router.get('/searchPrice/:keyword', function (req, res) {
    var keyword = parseInt(req.params.keyword);
    console.log('Should be Sale Price', req.params.keyword);
    Listing.find({ cost: { $lte: keyword } }).sort({ cost: 1 }).exec(function (err, listingsFound) {
        if (err) {
            console.log("Error!", err);
            res.sendStatus(500);
        } else {
            res.send(listingsFound);
        }
    });
})//end search by Price GET route

router.put('/:id', function (req, res){
    console.log('id', req.params.id);
    console.log('req.body', req.body);
    var listingToUpdate = req.body;
    var idToUpdate = req.params.id;
    var priceUpdate = parseInt(req.body.cost);
    var cityUpdate = req.body.city;
    var sqftUpdate = parseInt(req.body.sqft);
    console.log('priceUpdate', priceUpdate);
    Listing.update({ "_id": idToUpdate }, listingToUpdate, function (err, listingToUpdate){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);

        }
    });
}); // END PUT ROUTE


// Make router available to other files
module.exports = router;