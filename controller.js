// Require models
var Locations  = require('./models').Location;
var Trips      = require('./models').Trip;
var routes     = require('./data/all-routes');

module.exports = {
  
  getAllRoutes: function(req, res) {
      // Fast - 20ms
      // Used for Routes main view
      res.set('Access-Control-Allow-Origin','*');
      res.send(routes);
  },
  
  getRouteTrips: function(req, res) {
    // Fast - 600ms
    // Used for Route, Favorites detail view
    // Give me all the trips for this route
    Trips.find({route_id: req.params.route_id}, function(err, docs){
      res.set('Access-Control-Allow-Origin','*');
      res.send(docs);
    });
  },
  
  getCurrentRouteTrips: function(req, res) {
    // Fast - 600ms
    // Used for Route, Favorites detail view
    // Give me all the trips for this route, greater than current time
    var now = new Date();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var sep = ':'
    var currentTime = hrs + sep + min + sep + sec;
    
    Trips.find({route_id: req.params.route_id}, function(err, docs){
      var trips = docs.filter(function(d) {
        for(var i = 0; i < d.stoptimes.length; i++) {
          return d.stoptimes[i].time > currentTime
        }
      });
      res.set('Access-Control-Allow-Origin','*');
      res.send(trips);
    });
  },
  
  search: function(req, res) {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var today = days[new Date().getDay()];
    
    var startCoordinates = req.params.start;
    var endLocation      = req.params.end;
    
    var startLocation;
    
    
    
    console.log('Today is', today)
    
    // Query
    // First match trips by day
    // where stop_lookup contains both locations (multikey index in mongo?)
    // where the end location has a higher index
    // and the time > now
    res.set('Access-Control-Allow-Origin','*');
    res.send(today);
  }
  
}
