myApp.service('RentalService', function ($http) {
    var self = this;

    self.newRental = {};
    self.rentals = { data: [] };
    self.edit = {
        editing: false
    }

    // addRental function
    self.addRental = function (newRental) {
        console.log('Rental property added');
        return $http.post('/rentals', newRental).then(function (response) {
            console.log('Success!');
            self.refreshRentals();
            return response;
        }).catch(function (err) {
            console.log('Post Route error', err);
        })
    } // end addRental function

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
        console.log('rentalId', rentalId);
        swal({
            title: 'Delete rental property?',
            text: "You won't be able to revert this!",
            icon: 'warning',
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
                    "icon": "success"
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
    self.updatedRental = {
        rent: '',
        city: '',
        sqft: '',
        id: '',
    };



    // Sweet alert popup to change values 
    self.update = function (id, rentalCity, rentalsqft, rentalrent) {
        console.log('number', id)
        self.updatedRental.id = id;
        self.updatedRental.city = rentalCity;
        self.updatedRental.rent = rentalrent;
        self.updatedRental.sqft = rentalsqft
        self.edit.editing = !self.edit.editing

    } //end update

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

    // calling the PUT route with the update information
    self.updatedInformation = function (id, city, sqft, rent) {
        self.updatedRental.city = city;
        self.updatedRental.sqft = sqft;
        self.updatedRental.rent = rent;
        self.updatedRental.id = id;
        $http.put('/rentals/' + self.updatedRental.id, self.updatedRental).then(function (response) {
            swal("Update Complete", "The listing has been updated!", "success");
            console.log(response);
            self.edit.editing = false;
            self.refreshRentals();
        }).catch(function (error) {
            console.log('Failure!');
        })
    } //end self.updatedInformation function


});

