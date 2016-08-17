
var Twitter = require('twitter');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'), {multiArgs: true});
var louisiana = require('./louisiana.json');
var geoJsonUtils = require('geojson-utils');
var geoJsonPolygonCenter = require('geojson-polygon-center');

var twitter = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

function streamTweets() {
  if (streamTweets.streaming) {
    return;
  }
  streamTweets.streaming = true;
  var stream = twitter.stream('statuses/filter', {track: 'need rescue,needs rescue,need help, needs help,larescue,send boat'});
  stream.on('data', function(event) {
    var coordinates;
    if (event.coordinates) {
      coordinates = event.coordinates
    }
    if (event.place)  {
      coordinates = geoJsonPolygonCenter(event.place.bounding_box)
    }
    if (coordinates && geoJsonUtils.pointInMultiPolygon(coordinates, louisiana)) {
      console.log('LOUISIANA MATCH');
      console.log(event.text);
    }
  });
  stream.on('error', function(error) {
    throw error;
  });
}

streamTweets();
