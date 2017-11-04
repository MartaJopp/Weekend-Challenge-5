var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/listings', {
        templateUrl: 'templates/listings.html',
        controller: 'ListingsController as listing'
    }).when('/rentals', {
        templateUrl: 'templates/rentals.html',
        controller: 'RentalsController as rentals'
    })
})
