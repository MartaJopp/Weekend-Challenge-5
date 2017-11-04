
myApp.controller('RentalsController', function ($http) {
    console.log('RentalsController created.');

    var rc = this;
    rc.message = "Working?";
    rc.rentals = []

    rc.addRental = function (newRental) {
        console.log('Rental property added');
        $http.post('/rentals', newRental).then(function (response) {
            console.log('Success!');
            rc.refreshRentals();
        }).catch(function (err) {
            console.log('Post Route error', err);
        })
    }

    rc.refreshRentals = function () {
        $http.get('/rentals').then(function (response) {
            console.log('Here are the rentals', response);
            rc.rentals = response.data;
        }).catch(function (err) {
            console.log('You did not GET any riddles');
        })
    }
    rc.refreshRentals();

    rc.delete = function (rentalId) {
        console.log('delete clicked');
        $http.delete('/rentals/' + rentalId).then(function (response) {
            console.log('Success!')
            rc.refreshRentals();
        }).catch(function (error) {
            console.log('Failure!');
        });
    }

});