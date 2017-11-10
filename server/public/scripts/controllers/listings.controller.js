
myApp.controller('ListingsController', function (ListingService) {
    console.log('ListingsController created.');

    var lc = this;
    lc.listings = ListingService.listings;
    lc.updatedListing = {};
    lc.isEditing = false;

    // add Listing function
    lc.addListing = function (newListing) {
        ListingService.addListing(newListing);
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
        console.log('UPDATE', listingToUpdate);
        
        lc.updatedListing = listingToUpdate;
        lc.isEditing = true;
        var fancyForm = document.getElementById('inputForm');
        swal("Write something here:", {
            content: fancyForm,
        }).then((value) => {
            console.log(lc.updatedListing);
            var updateThis = lc.updatedListing
            ListingService.updatedInformation(listingId, updateThis);
            lc.isEditing = false;
        });
        ListingService.updatedInformation(listingId, listingToUpdate);
    }
    //Search
    lc.citySearch = function (value, keyword) {
        ListingService.citySearch(value, keyword);
    }//end search by location

});