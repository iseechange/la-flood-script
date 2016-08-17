
var config = require('./config');
var client = new require('twitter')(config.twitter);

function createTweetStream(opts) {
  var stream = client.stream('statuses/filter', opts);
  stream.client = client;
  return stream;
}

module.exports.createTweetStream = createTweetStream;
