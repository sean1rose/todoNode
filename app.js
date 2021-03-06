var express = require('express');
var app = express();
var mongoose = require('mongoose');
// config file w/ credentials to set up connection to mlab dbase
var config = require('./config');

// setupController is a function that adds an endpoint to the express app (pass in app as an argument)
  // runs endpoint, connects to mongoose, use mongoose.create to add seed data
var setupController = require('./controllers/setupController');

var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// config folder has index.js -> getDbConnectionString, which returns the url to mLab DB...
mongoose.connect(config.getDbConnectionString());

// call the function that's returned by require
setupController(app);

// call the function that's returned by require (adds all of the route handlers, including middleware that parses http request)
apiController(app);

app.listen(port);