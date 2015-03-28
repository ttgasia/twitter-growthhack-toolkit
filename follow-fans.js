var T = require('./index.js'),
  argv = require('minimist')(process.argv.slice(2)),
  stopId = argv['stopId'] || -1; //348336389 = omgisarcasm

T.get('friends/ids', {
  screen_name: 'geekykaran',
  count: 2000
}, function(err, data, response) {
  var idList = data.ids,
    stopId = 348336389, //348336389 = omgisarcasm
    i = 0;
  while (idList[i] !== stopId) {
    var id = idList[i];
    console.log('Unfollowing');
    T.post('friendships/destroy', {
      user_id: id
    }, function(err, data, response) {
      console.log('Unfollowed');
    });
    i++;
  }
});
