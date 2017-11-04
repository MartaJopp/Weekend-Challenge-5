myApp.service('ListingService', function($http){
    var self = this;

self.newListing = {};
self.listings = {data: []};

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
self.delete = function (id) {
    ('Listing delete clicked');
    $http.delete('/listings/' + id).then(function (response) {
        console.log('Success!');
        self.refreshListings();
    }).catch(function (error) {
        console.log('Failure!');
    });
} // end delete listing function

});