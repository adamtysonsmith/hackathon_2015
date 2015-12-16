var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  geo: {
    type: String,
    coordinates: []
  }
}, { collection: 'stoplocations' });

var tripSchema = mongoose.Schema({
    trip_id: String,
    route_id: String,
    days: String,
    headsign: String,
    route_name: String,
    direction: String,
    stop_lookup: [],
    stoptimes: []
}, { collection: 'final_data' });

var Location = mongoose.model('Location', locationSchema);
var Trip     = mongoose.model('Trip', tripSchema);

module.exports = {
  Location: Location,
  Trip: Trip
}