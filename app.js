var express = require('express');
var app = express();
var mongoose = require('mongoose');
// config file w/ credentials to set up connection to mlab dbase
var config = require('./config');

// setupController is a function that adds an endpoint to the express app (pass in app as an argument)
  // runs endpoint, connects to mongoose, use mongoose.create to add seed data
var setupController = require('./controllers/setupController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);

app.listen(port);