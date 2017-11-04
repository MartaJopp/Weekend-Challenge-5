
myApp.controller('ListingsController', function ($http) {
    console.log('ListingsController created.');

    var lc = this;
    lc.message = "Work!";
    lc.listings = [];
    

    lc.addListing = function (newListing) {
        console.log('Rental property added');
        $http.post('/listings', newListing).then(function (response) {
            console.log('Success!');
            lc.refreshListings();
        }).catch(function (err) {
            console.log('Something went wrong', err);
        })
    }

    lc.refreshListings = function () {
        $http.get('/listings').then(function (response) {
            console.log('Here are the listings', response);
            lc.listings = response.data;
        }).catch(function (err) {
            console.log('Error received,', err);
        })
    }
    lc.refreshListings();

});