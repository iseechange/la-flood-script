
var usgs = require('./usgs');
var utils = require('./utils');
var twitter = require('./twitter');
var geoJsonPolygonCenter = require('geojson-polygon-center');

var tweetStream = twitter.createTweetStream({
  track: 'need rescue,needs rescue,need help,needs help,larescue,send boat,rescue,shelter,louisiana'
});

tweetStream.on('data', function(tweet) {
  console.log('\n\n');
  console.log('New tweet!', tweet.text);
  var point = null;
  !!tweet.coordinates 
    && (point = tweet.coordinates); 
  !!tweet.place 
    && (point = geoJsonPolygonCenter(tweet.place.bounding_box)); 
  if (!point) {
    console.log('Missing location data.');
    return;
  }
  var isInLouisiana = utils.isPointInLouisiana(point);
  var isNearUSGSStation = usgs.isPointOrPolygonNearUSGSStation(point);
  console.log(isInLouisiana ? 'Tweet in/from Louisiana.' : 'Tweet from somewhere else.');
  console.log(isNearUSGSStation ? 'Tweet near USGS station.' : 'Tweet not near USGS station.');
  console.log('\n\n');
});

tweetStream.on('error', function(error) {
  throw error;
});
