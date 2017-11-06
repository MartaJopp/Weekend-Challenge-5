myApp.service('ListingService', function ($http) {
    var self = this;

    self.newListing = {};
    self.listings = { data: [] };

    // add Listing function
    self.addListing = function (newListing) {
        console.log('Rental property added');
        $http.post('/listings', newListing).then(function (response) {
            console.log('Success!');
            self.refreshListings();
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
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            $http.delete('/listings/' + listingId).then(function (response) {
                console.log('Success!')
                swal({
                    "title": "Deleted!",
                    "text": "The listing has been deleted!",
                    "type": "success"
                });
                self.refreshListings();
            }).catch(function (error) {
                console.log('Failure!');
            })
        } // end listing delete
            )
    };

    self.update = function (listingId) {
        swal({
            title: 'Update Listing',
            html:
            '<label for="city">Location: </label>' +
            '<input type="text" ng-model="listing.newListing.city" id="city" placeholder="City" />' +
            '<label for="sqft">Square Footage: </label>' +
            '<input type="number" ng-model="listing.newListing.sqft" id="sqft" placeholder="Square Footage" />' +
            '<label for="cost">Price: </label>' +
            '<input type="number" ng-model="Listing.newListing.cost" id="cost" placeholder="Price" />',
            focusConfirm: false,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve([value, value, value
                        // how to capture above inputs?
                    ])
                })
            }
        }).then(function (result) {
            swal(JSON.stringify(result))
        }).catch(swal.noop)

    } // end update function

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
}); 
