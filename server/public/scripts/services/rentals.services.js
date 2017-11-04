myApp.service('RentalService', function ($http) {
    var self = this;

self.rentals = {data: []};
    // addRental function
    self.addRental = function (newRental) {
        console.log('Rental property added');
        $http.post('/rentals', newRental).then(function (response) {
            console.log('Success!');
            self.refreshRentals();
        }).catch(function (err) {
            console.log('Post Route error', err);
        })
    } //end addRental function

    //refreshRentals function
self.refreshRentals = function () {
        $http.get('/rentals').then(function (response) {
            console.log('Here are the rentals', response);
            self.rentals.data = response.data;
        }).catch(function (err) {
            console.log('You did not GET any riddles');
        })
    } // end refreshRentals

// delete rental function
self.delete = function (rentalId) {
    console.log('delete clicked');
    $http.delete('/rentals/' + rentalId).then(function (response) {
        console.log('Success!')
        self.refreshRentals();
    }).catch(function (error) {
        console.log('Failure!');
    })
} // end rental delete

})