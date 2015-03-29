var T = require('./index'),
  utils = require('./utils'),
  argv = require('minimist')(process.argv.slice(2)),
  ownerUsername = argv['username'] || -1,
  ownerUserId = argv['userId'] || -1;

var favoriteStream = T.stream('user');

favoriteStream.on('favorite', function(tweet) {
  if (ownerUsername !== tweet.source.screen_name) {
    console.log('Favorite received. Following @' + tweet.source.screen_name);
    T.post('friendships/create', {
      user_id: tweet.source.id
    }, function(err, data, response) {
      if (err) {
        console.log(err);
      }
    });
  }
});

favoriteStream.on('follow', function(tweet) {
  if (ownerUsername !== tweet.source.screen_name) {
    console.log('Follow received. Following @' + tweet.source.screen_name);
    T.post('friendships/create', {
      user_id: tweet.source.id
    }, function(err, data, response) {
      if (err) {
        console.log(err);
      }
    });
  }
});



var statusStream = T.stream('statuses/filter', {
  track: ownerUsername
});

statusStream.on('tweet', function(tweet) {
  if (ownerUsername !== tweet.user.screen_name) {
    //Native retweet
    if (tweet.retweeted_status && tweet.retweeted_status.retweet_count > 0) {
      console.log('Retweet received. Following @' + tweet.user.screen_name);
      T.post('friendships/create', {
        user_id: tweet.user.id
      }, function(err, data, response) {
        if (err) {
          console.log(err);
        }
      });
    }
    /* Reply */
    else {
      console.log('Reply/Mention received. Favorited tweet by @' + tweet.user.screen_name);
      utils.doFavorite(tweet.id_str);
    }
  }
});
