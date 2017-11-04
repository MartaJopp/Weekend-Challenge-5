
myApp.controller('ListingsController', function ($http) {
    console.log('ListingsController created.');

    var lc = this;
    lc.message = "Work!";
    lc.listings = [];
    
// add Listing function
    lc.addListing = function (newListing) {
        console.log('Rental property added');
        $http.post('/listings', newListing).then(function (response) {
            console.log('Success!');
            lc.refreshListings();
        }).catch(function (err) {
            console.log('Something went wrong', err);
        })
    } //end Listing function

    // refreshListings function
    lc.refreshListings = function () {
        $http.get('/listings').then(function (response) {
            console.log('Here are the listings', response);
            lc.listings = response.data;
        }).catch(function (err) {
            console.log('Error received,', err);
        })
    } //end refresh listings function

    //refresh listings on page load
    lc.refreshListings();

    // delete listing function
    lc.delete = function (id) {
        ('Listing delete clicked');
        $http.delete('/listings/' + id).then(function (response) {
            console.log('Success!');
            lc.refreshListings();
        }).catch(function (error) {
            console.log('Failure!');
        });
    } // end delete listing function

});