
var utils = require('./utils');
var geoJsonUtils = require('geojson-utils');

/*
 * URL for JSON feed of USGS' active stations
 */

var USGS_FEED_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&stateCd=la&parameterCd=00060,00065&siteType=ES,LK,ST,ST-CA,ST-DCH,ST-TS&siteStatus=active';

/*
 * The aim is to update this w/ GeoJSON Point instances
 * of USGS stations acting up due to HWM events
 */

var USGSPoints = [];

/*
 * Retrieves USGS stations and maps them to GeoJSON Point instances
 */

function getUSGSPoints() {
 return utils.request(USGS_FEED_URL)
   .get(1)
   .then(JSON.parse)
   .get('value')
   .get('timeSeries')
   .map(function(source) {
     var location = source.sourceInfo.geoLocation.geogLocation;
     return {type: 'Point', coordinates: [location.longitude, location.latitude]};
   });
}

/*
 * Updates USGS points
 */

function updateUSGSPoints() {
  getUSGSPoints()
    .then(function(points) {
      USGSPoints = points;
      console.log('>> USGS points updated (%s)!', points.length);
    });
}

/*
 * Triggers an update every minute
 */

updateUSGSPoints();
setInterval(updateUSGSPoints, 60 * 1000);

/*
 * Checks whether a GeoJSON Point or (Multi)Polygon
 * is within a given radius of a USGS station
 */

function isPointOrPolygonNearUSGSStation(point) {
  for (var i = 0; i < USGSPoints.length; i++) {
    if (geoJsonUtils.pointDistance(point, USGSPoints[i]) < 500 * 1000) {
      return true;
    }
  }
  return false;
}

module.exports.isPointOrPolygonNearUSGSStation = isPointOrPolygonNearUSGSStation;