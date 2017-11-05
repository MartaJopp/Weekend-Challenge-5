var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalSchema = new Schema({ rent: Number, sqft: Number, city: String });

// Rental = docuemnt, with these properties located in rentals collection
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

// POST route
router.post('/', function (req, res) {
    console.log(req.body); //rental property received in addRental function
    var rentalToAdd = new Rental(req.body); //renaming to work with mongoose
    rentalToAdd.save(function (err, data) {
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
    Rental.find({}).sort({ rent: 1 }).exec(function (err, rentalsFound) { //finding all rentals in collection
        if (err) {
            console.log("ERROR!", err);
            res.sendStatus(500);
        } else {
            res.send(rentalsFound);
        }
    }); // END FIND
}); // END GET Route

router.delete('/:id', function (req, res) {
    var rentalId = req.params.id;
    Rental.findByIdAndRemove({ "_id": rentalId }, function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    }); 
});// END DELETE ROUTE
    // Search by City get route
router.get('/searchCity/:keyword', function (req, res) {
        var keyword = req.params.keyword;
        Rental.find({ "city": { "$regex": keyword, "$options": "i" } }, function (err, rentalsFound) {
            if (err) {
                console.log("Error!", err);
                res.sendStatus(500);
            } else {
                res.send(rentalsFound);
            }
        }); 
})//end search by City GET route

//search by Square Footage Get Route
router.get('/searchSqft/:keyword', function (req, res) {
    var keyword = parseInt(req.params.keyword);
    console.log('Should be Square Feet', req.params.keyword);
    Rental.find({ sqft: { $gte: keyword } }).sort({ rent: 1 }).exec(function (err, rentalsFound) {
        if (err) {
            console.log("Error!", err);
            res.sendStatus(500);
        } else {
            res.send(rentalsFound);
        }
    });
})//end search by Square Footage GET route

//search by Rent Footage Get Route
router.get('/searchRent/:keyword', function (req, res) {
    var keyword = parseInt(req.params.keyword);
    console.log('Should be Rent', req.params.keyword);
    Rental.find({ rent: { $lte: keyword } }).sort({ rent: 1 }).exec(function (err, rentalsFound) {
        if (err) {
            console.log("Error!", err);
            res.sendStatus(500);
        } else {
            res.send(rentalsFound);
        }
    });
})//end search by Rent Footage GET route

// Make router available to other files
module.exports = router;
