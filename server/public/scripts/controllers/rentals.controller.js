
myApp.controller('RentalsController', function ($http) {
    console.log('RentalsController created.');

    var rc = this;
    rc.message = "Working?";
    rc.rentals = []

    // addRental function
    rc.addRental = function (newRental) {
        console.log('Rental property added');
        $http.post('/rentals', newRental).then(function (response) {
            console.log('Success!');
            rc.refreshRentals();
        }).catch(function (err) {
            console.log('Post Route error', err);
        })
    } //end addRental function
    
//refresh rentals function
    rc.refreshRentals = function () {
        $http.get('/rentals').then(function (response) {
            console.log('Here are the rentals', response);
            rc.rentals = response.data;
        }).catch(function (err) {
            console.log('You did not GET any riddles');
        })
    } // end refreshRentals
    rc.refreshRentals();


    // rental delete function
    rc.delete = function (rentalId) {
        console.log('delete clicked');
        $http.delete('/rentals/' + rentalId).then(function (response) {
            console.log('Success!')
            rc.refreshRentals();
        }).catch(function (error) {
            console.log('Failure!');
        })
    } // end rental delete

});