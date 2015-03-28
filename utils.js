module.exports = {
  isPresentInUserMention: function(userMentionArray, userId) {
    var isPresent = false;
    if (userMentionArray.length === 0) {
      return isPresent;
    }

    userMentionArray.some(function(item) {
      if (item.id === userId) {
        isPresent = true;
        return isPresent;
      }
    });

    return isPresent;
  }
}
