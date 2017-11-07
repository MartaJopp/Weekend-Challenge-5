myApp.service('ListingService', function ($http) {
    var self = this;

    self.newListing = {};
    self.listings = { data: [] };

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
        sqft: ''
    };

// Sweet alert popup to change values 
    self.update = function (listingId, listingToUpdate) {
        console.log('Update Clicked');
        console.log('id', listingId);
        var fancyForm = document.getElementById('inputForm');
        swal("Update Listing for Sale:", {
            content: fancyForm,
        }).then((value) => {
            self.updatedListing.cost = document.getElementById('priceInput').value;
            self.updatedListing.city = document.getElementById('cityInput').value;
            self.updatedListing.sqft = document.getElementById('sqftInput').value;
            console.log(self.updatedListing);
            var updateThis = self.updatedListing
            self.updatedInformation (listingId, updateThis);
        });
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
    self.updatedInformation = function (listingId, updateThis) {
        console.log('Update this', listingId, updateThis);
        $http.put('/listings/' + listingId, updateThis).then(function(response){
            swal("Update Complete", "The listing has been updated!", "success");
            console.log(response);
            self.refreshListings();
        }).catch(function (error) {
            console.log('Failure!');
        })
    } //end self.updatedInformation function
}); 
