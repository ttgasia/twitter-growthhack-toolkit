var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  argv = require('minimist')(process.argv.slice(2)),
  followList,
  whitelistedWords;

followList = [274016135, 5625972, 26274219, 17601281, 65117552, ]; //EventMB, eventbrite, BizBash, SmartMeetings, SuccessfulMtgs

var statusStream = T.stream('statuses/filter', {
  follow: followList
});

statusStream.on('tweet', function(tweet) {
  if (followList.indexOf(tweet.user.id) > -1 && !tweet.retweeted_status) {
    console.log('@' + tweet.user.screen_name + ' tweeted.');
    console.log(tweet.text);
    var lowercaseTweet = tweet.text.toLowerCase();
    if (
      lowercaseTweet.indexOf('event') === -1 &&
      lowercaseTweet.indexOf('eventprof') === -1 &&
      lowercaseTweet.indexOf('meetings') === -1 &&
      lowercaseTweet.indexOf('meetingprof') === -1 &&
      lowercaseTweet.indexOf('MICE') === -1 &&
      lowercaseTweet.indexOf('marketing') === -1 &&
      lowercaseTweet.indexOf('exhibition') === -1 &&
      lowercaseTweet.indexOf('incentive') === -1 &&
      lowercaseTweet.indexOf('conference') === -1 &&
      lowercaseTweet.indexOf('association') === -1 &&
      lowercaseTweet.indexOf('business') === -1 &&
      lowercaseTweet.indexOf('networking') === -1 &&
      lowercaseTweet.indexOf('education') === -1 &&
      tweet.user.id !== 274016135 && //EventMB
      tweet.user.id !== 17601281 //SmartMeetings
    ) {
      console.log('No status update. Did not pass sanity check.')
      console.log('-----');
      return;
    }
    T.post('statuses/update', {
      status: tweet.text
    }, function(err, data, response) {
      if (err) {
        console.log('Error updating status')
        console.log('-----');
        return;
      }
      notifier.notify({
        'title': '@' + tweet.user.screen_name + ' tweeted.',
        'message': tweet.text
      });
      console.log('Status updated successfully. ' + new Date())
      console.log('-----');
    });
  }
});
