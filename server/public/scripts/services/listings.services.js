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

    self.updatedListing = {
        price: '',
        city: '',
        sqft: ''
    };

// Sweet alert popup to change values 
    // self.update = function (listingId, listingToUpdate) {
    //     console.log('Update Clicked');
    //     var fancyForm = document.getElementById('inputForm');
        
    // } //end update

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
    self.updatedInformation = function (listingId, updateThis) {
        console.log('Update this', listingId, updateThis);

    } //end self.updatedInformation function
}); 
