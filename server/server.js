var express = require('express'); // use express
var app = express(); 
var port = 5000; // listen on port 5000
var bodyParser = require('body-parser'); // require body-parser
var listings = require('./routes/listings.router.js'); // accesses router
var rentals = require('./routes/rentals.router.js'); // accesses router



app.use(bodyParser.json());
// static files
app.use(express.static('server/public'));

app.use('/listings', listings);
app.use('/rentals', rentals);

// Mongoose Code:
var mongoose = require('mongoose');
// realestate is the name of our database
// 27017 is the default mongo port number
var databaseUrl = 'mongodb://localhost:27017/realestate';

mongoose.connection.on('connected', function () {
    console.log('mongoose is connected!'); //lets us know mongoose is connected
});

mongoose.connection.on('error', function () {
    console.log('mongoose connection failed');
});
mongoose.connect(databaseUrl);


app.listen(port, function () {
    console.log('Listening on port', port) // lets us know server is working
})
