var mongoose   = require('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller');
var secret     = require('./secret');

// connect to db
mongoose.connect(secret || 'mongodb://localhost/rtd');

// configure express
var app = express();
app.use(bodyParser.json());

// routes
app.get('/all-routes', controller.getAllRoutes);
app.get('/trips/:route_id', controller.getRouteTrips); // all trips for a route
app.get('/current-trips/:route_id', controller.getCurrentRouteTrips); // current available trips for a route
app.get('/search/:start/:end', controller.search);

// server
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Express server listening on port:', port);
});