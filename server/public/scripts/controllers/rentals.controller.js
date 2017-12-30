
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

        // console.log('Rental property added');
        // $http.post('/rentals', newRental).then(function (response) {
        //     console.log('Success!');
        //     rc.refreshRentals();
        // }).catch(function (err) {
        //     console.log('Post Route error', err);
        // })
    } //end addRental function

    //refresh rentals function
    rc.refreshRentals = function () {
        RentalService.refreshRentals();
        //     $http.get('/rentals').then(function (response) {
        //         console.log('Here are the rentals', response);
        //         rc.rentals = response.data;
        //     }).catch(function (err) {
        //         console.log('You did not GET any riddles');
        //     })
    } // end refreshRentals
    rc.refreshRentals();


    // rental delete function
    rc.delete = function (rentalId) {
        RentalService.delete(rentalId);
        // console.log('delete clicked');
        // $http.delete('/rentals/' + rentalId).then(function (response) {
        //     console.log('Success!')
        //     rc.refreshRentals();
        // }).catch(function (error) {
        //     console.log('Failure!');
        // })
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