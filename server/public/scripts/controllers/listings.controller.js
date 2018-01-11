
myApp.controller('ListingsController', function (ListingService) {
    console.log('ListingsController created.');

    var lc = this;
    lc.listings = ListingService.listings;
    lc.edit = ListingService.edit;
    lc.updatedListing = ListingService.updatedListing;


    // add Listing function
    lc.addListing = function (newListing) {
        ListingService.addListing(newListing).then(function (response) {
            console.log('response', response);
            lc.refreshListings();
            swal({
                "title": "Added!",
                "text": "The listing has been added!",
                "icon": "success"
            });
        }).catch(function () {
            swal('Something went wrong.');
        });
     
    } //end Listing function

    // refreshListings function
    lc.refreshListings = function () {
        ListingService.refreshListings();
     
    } //end refresh listings function

    //refresh listings on page load
    lc.refreshListings();

    // delete listing function
    lc.delete = function (id) {
        ListingService.delete(id);
   
    } // end delete listing function

    //update listing function
    lc.update = function (listingId, listingCity, listingsqft, listingCost) {
        ListingService.update(listingId, listingCity, listingsqft, listingCost);
    }
    //Search
    lc.citySearch = function (value, keyword) {
        ListingService.citySearch(value, keyword);
    }//end search by location

    lc.cancelEdit = function () {
        lc.edit.editing = false;
    }

    lc.updatedInformation = function (id, city, sqft, cost) {
        ListingService.updatedInformation(id, city, sqft, cost)
    }

});