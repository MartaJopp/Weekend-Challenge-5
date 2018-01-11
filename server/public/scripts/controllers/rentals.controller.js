
myApp.controller('RentalsController', function (RentalService) {
    console.log('RentalsController created.');

    var rc = this;
    rc.rentals = RentalService.rentals;
    rc.edit = RentalService.edit;
    rc.updatedRental = RentalService.updatedRental;

    // addRental function
    rc.addRental = function (newRental) {
        RentalService.addRental(newRental).then(function (response) {
            console.log('response', response);
            rc.refreshRentals();
            swal({
                "title": "Added!",
                "text": "The rental has been added!",
                "icon": "success"
            });
        }).catch(function () {
            swal('Something went wrong.');
        });


    } //end addRental function

    //refresh rentals function
    rc.refreshRentals = function () {
        RentalService.refreshRentals();
     
    } // end refreshRentals
    rc.refreshRentals();


    // rental delete function
    rc.delete = function (rentalId) {
        RentalService.delete(rentalId);
    
    } // end rental delete

    // rental update function
    rc.update = function (rentalId, rentalCity, rentalsqft, rentalrent) {

        RentalService.update(rentalId, rentalCity, rentalsqft, rentalrent)
    }

    //search by location
    rc.citySearch = function (value, keyword) {
        RentalService.citySearch(value, keyword);
    }//end search by location

    rc.cancelEdit = function () {
        rc.edit.editing = false;
    }

    rc.updatedInformation = function (id, city, sqft, rent) {
        RentalService.updatedInformation(id, city, sqft, rent)
    }
});