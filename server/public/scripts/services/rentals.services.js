myApp.service('RentalService', function ($http) {
    var self = this;

    self.rentals = { data: [] };

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
        swal({
            title: 'Delete rental property?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            $http.delete('/rentals/' + rentalId).then(function (response) {
                console.log('Success!')
                swal({
                    "title": "Deleted!",
                    "text": "The rental property has been deleted!",
                    "type": "success"
                });
                self.refreshRentals();
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end rental delete
            )
    };
    // send put request with the id and then the new values which can be put in the
    // form - and saved?  I believe I would call the function with the id, and also the entire row.
    self.update = function (rentalId, rentalToUpdate) {
        console.log('Update Clicked');
        // swal({
        //     title: 'Multiple inputs',
        //     html:
        //     '<label for="city">Location: </label>',
        //     '<input type="text" ng-model="rental.newRental.city" id="city" placeholder="City" />'
        //     focusConfirm: false,
        //     preConfirm: function () {
        //         return new Promise(function (resolve) {
        //             resolve(

        //                 )
        //         })
        //     }
        // }).then(function (result) {
        //     swal(JSON.stringify(result))
        // }).catch(swal.noop)
    }

    self.citySearch = function (value, keyword) {
        console.log(value, keyword);
        if (value === 'city') {
            $http.get('/rentals/searchCity/' + keyword).then(function (response) {
                console.log(response);
                self.rentals.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if city
        if (value === 'sqft') {
            $http.get('/rentals/searchSqft/' + keyword).then(function (response) {
                console.log(response);
                self.rentals.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if sqft
        if (value === 'rent') {
            $http.get('/rentals/searchRent/' + keyword).then(function (response) {
                console.log(response);
                self.rentals.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if rent    
    } // end citySearch function
});
