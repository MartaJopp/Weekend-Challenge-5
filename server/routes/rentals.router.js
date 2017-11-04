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
}); // END DELETE Route

// Make router available to other files
module.exports = router;
