var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  argv = require('minimist')(process.argv.slice(2)),
  followList,
  whitelistedWords;

followList = [33057154, 1605891337, 609718712, 14894250, 2792078121, 18185124, 26554000, 2332401396, 468290519, 409435591, 233430873, 1705885393, 159642250, 14426771, 2604068238, 1890842214, 17093617, 2670122929, 259725229, 25458378]; //JeffSheehan, GrowthHackerAm, GrowthHackingWP, fab_brianson, m1lem, jeffbullas, RebekahRadice, loveandstartups, SharonTighe, Onboardly, Notebook, GrowthHackers, GrowthHacker, SeanEllis, thepressfarm, seotomize, hootsuite, GrowthHackerSEO, ValaAfshar, AskAaronLee

var statusStream = T.stream('statuses/filter', {
  follow: followList
});

statusStream.on('tweet', function(tweet) {
  if (followList.indexOf(tweet.user.id) > -1 && !tweet.retweeted_status) {
    console.log('@' + tweet.user.screen_name + ' tweeted.');
    console.log(tweet.text);
    var lowercaseTweet = tweet.text.toLowerCase();
    if (
      lowercaseTweet.indexOf('social') === -1 &&
      lowercaseTweet.indexOf('market') === -1 &&
      lowercaseTweet.indexOf('brand') === -1 &&
      lowercaseTweet.indexOf('onboard') === -1 &&
      lowercaseTweet.indexOf('lead') === -1 &&
      lowercaseTweet.indexOf('seo') === -1 &&
      lowercaseTweet.indexOf('sell') === -1 &&
      lowercaseTweet.indexOf('content') === -1 &&
      lowercaseTweet.indexOf('analytics') === -1 &&
      lowercaseTweet.indexOf('growth') === -1 &&
      lowercaseTweet.indexOf('startup') === -1 &&
      lowercaseTweet.indexOf('entrepreneur') === -1 &&
      lowercaseTweet.indexOf('blog') === -1 &&
      tweet.user.id !== 2246032237 && //iamjtsuccess
      tweet.user.id !== 25458378 //AskAaronLee
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
