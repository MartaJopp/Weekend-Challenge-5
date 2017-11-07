
myApp.controller('ListingsController', function (ListingService) {
    console.log('ListingsController created.');

    var lc = this;
    lc.listings = ListingService.listings;

    // add Listing function
    lc.addListing = function (newListing) {
        ListingService.addListing(newListing).then (function (response) {
            console.log('response', response);
            lc.refreshListings();
            swal({"title": "Added!",
                "text": "The listing has been added!",
                "icon": "success"});
        }).catch(function () {
            swal('Something went wrong.');
        });
        // console.log('Rental property added');
        // $http.post('/listings', newListing).then(function (response) {
        //     console.log('Success!');
        //     lc.refreshListings();
        // }).catch(function (err) {
        //     console.log('Something went wrong', err);
        // })
    } //end Listing function

    // refreshListings function
    lc.refreshListings = function () {
        ListingService.refreshListings();
        // $http.get('/listings').then(function (response) {
        //     console.log('Here are the listings', response);
        //     lc.listings = response.data;
        // }).catch(function (err) {
        //     console.log('Error received,', err);
        // })
    } //end refresh listings function

    //refresh listings on page load
    lc.refreshListings();

    // delete listing function
    lc.delete = function (id) {
        ListingService.delete(id);
        // ('Listing delete clicked');
        // $http.delete('/listings/' + id).then(function (response) {
        //     console.log('Success!');
        //     lc.refreshListings();
        // }).catch(function (error) {
        //     console.log('Failure!');
        // });
    } // end delete listing function

    //update listing function
    lc.update = function (listingId, listingToUpdate) {
        ListingService.update(listingId, listingToUpdate);
    }
    //Search
    lc.citySearch = function (value, keyword) {
        ListingService.citySearch(value, keyword);
    }//end search by location

});