//
// USGS stuff
//

// var USGSLocations = [];
// var USGS_FEED_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&stateCd=la&parameterCd=00060,00065&siteType=ES,LK,ST,ST-CA,ST-DCH,ST-TS&siteStatus=active';

//
// function getUSGSLocations() {
//  return request(USGS_FEED_URL)
//    .get(1)
//    .then(JSON.parse)
//    .get('value')
//    .get('timeSeries')
//    .map(function(source) {
//      var location = source.sourceInfo.geoLocation.geogLocation;
//      return {type: 'Point', coordinates: [location.longitude, location.latitude]};
//    });
// }
//
// function updateUSGSLocations() {
//   getUSGSLocations()
//     .then(function(locations) {
//       USGSLocations = locations;
//       console.log('>> Locations updated (%s)!', locations.length);
//       streamTweets();
//     });
// }
//
// function checkIntersection(polygon) {
//   for (var i = 0; i < USGSLocations.length; i++) {
//     if (geoJsonUtils.pointInPolygon(USGSLocations[i], polygon)) {
//       return true;
//     }
//   }
//   return false;
// }
//
// function checkDistance(point) {
//   for (var i = 0; i < USGSLocations.length; i++) {
//     if (geoJsonUtils.pointDistance(point, USGSLocations[i]) < 500 * 1000) {
//       return true;
//     }
//   }
//   return false;
// }
//
// updateUSGSLocations();
// setInterval(updateUSGSLocations, 60 * 1000);