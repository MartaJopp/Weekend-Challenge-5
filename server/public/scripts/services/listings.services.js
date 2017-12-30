myApp.service('ListingService', function ($http) {
    var self = this;

    self.newListing = {};
    self.listings = { data: [] };
    self.edit = {
        editing: false
    }
    // add Listing function
    self.addListing = function (newListing) {
        console.log('Rental property added');
        return $http.post('/listings', newListing).then(function (response) {
            console.log('Success!');
            self.refreshListings();
            return response;
        }).catch(function (err) {
            console.log('Something went wrong', err);
        })
    } //end Listing function

    self.refreshListings = function () {
        $http.get('/listings').then(function (response) {
            console.log('Here are the listings', response);
            self.listings.data = response.data;
        }).catch(function (err) {
            console.log('Error received,', err);
        })
    } //end refresh listings function

    // delete listing function
    self.delete = function (listingId) {
        swal({
            title: 'Delete property for sale?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            return $http.delete('/listings/' + listingId).then(function (response) {
                console.log('Success!')
                swal({
                    "title": "Deleted!",
                    "text": "The listing has been deleted!",
                    "icon": "success"
                });
                self.refreshListings();
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end listing delete
            )
    };

    self.updatedListing = {
        cost: '',
        city: '',
        sqft: '',
        id: ''
    };

    // update information
    self.update = function (id, city, sqft, cost) {
        console.log('number', id)
        self.updatedListing.id = id;
        self.updatedListing.city = city;
        self.updatedListing.cost = cost;
        self.updatedListing.sqft = sqft
        self.edit.editing = !self.edit.editing
    } //end update

    self.citySearch = function (value, keyword) {
        console.log(value, keyword);
        if (value === 'city') {
            $http.get('/listings/searchCity/' + keyword).then(function (response) {
                console.log(response);
                self.listings.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if city
        if (value === 'sqft') {
            $http.get('/listings/searchSqft/' + keyword).then(function (response) {
                console.log(response);
                self.listings.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if sqft
        if (value === 'cost') {
            $http.get('/listings/searchPrice/' + keyword).then(function (response) {
                console.log(response);
                self.listings.data = response.data;
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end if cost    
    } // end citySearch function

    // calling the PUT route with the update information
    self.updatedInformation = function (id, city, sqft, cost) {
        self.updatedListing.city = city;
        self.updatedListing.sqft = sqft;
        self.updatedListing.cost = cost;
        self.updatedListing.id = id;
        console.log(self.updatedListing.id)
        $http.put('/listings/' + self.updatedListing.id, self.updatedListing).then(function (response) {
            swal("Update Complete", "The listing has been updated!", "success");
            console.log(response);
            self.edit.editing = false;
            self.refreshListings();
        }).catch(function (error) {
            console.log('Failure!');
        })
    } //end self.updatedInformation function
}); 
