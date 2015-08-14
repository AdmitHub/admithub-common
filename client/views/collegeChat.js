var getMatchesWithUnreadMessages = function(extraQueryObj) {
  var query = {
    "userId": Meteor.userId(),
    "messages": {
      $elemMatch: {
        "read": {$in: [false, undefined]},
        "sender": {$in: ["college", "admithub"]}
      }
    }
  };

  if(extraQueryObj) {
    query = _.extend(extraQueryObj, query);
  }

  return Matches.find(query);
};

var getMatchUnreadMessagesCount = function(match) {
  if(!match || !match.messages || match.messages.length === 0) {
    return 0;
  }

  var count = 0;

  for(var message in match.messages) {
    count += !message.read ? 1 : 0;
  }

  return count;
};

var getMatchesUnreadMessagesCount = function() {
  var matchesWithUnreadMessagesCursor = getMatchesWithUnreadMessages();

  if(matchesWithUnreadMessagesCursor.count() === 0) {
    return 0;
  }

  var matchesWithUnreadMessages = matchesWithUnreadMessagesCursor.fetch();

  var count = 0;

  for(var i = 0; i < matchesWithUnreadMessages.length; i++) {
    var match = matchesWithUnreadMessages[i];
    count += getMatchUnreadMessagesCount(match);
  }

  return count;
};

var currentCollegeId;
Template.collegeChat.created = function() {
  currentCollegeId = new ReactiveVar(-1);
};

Template.collegeChat.helpers({
  hasUnreadMessages: function() {
    return getMatchesUnreadMessagesCount() > 0;
  },
  unreadMessageCount: function() {
    var count = getMatchesUnreadMessagesCount();

    return count > 99 ? "99+" : count;
  },
  matches: function() {
    return  Matches.find({userId: Meteor.userId()}).fetch();
  },
  collegeLogo: function(collegeId) {
    var college = Colleges.findOne({_id: collegeId});

    if(!college || !college.schoolLogo) {
      return "";
    }

    return college.schoolLogo;
  },
  collegeName: function(collegeId) {
    var college = Colleges.findOne({_id: collegeId});

    if(!college || !college.name) {
      return "Unknown";
    }

    return college.name;
  },
  collegeUnreads: function(collegeId) {
    var collegeMatchCursor = getMatchesWithUnreadMessages({
      collegeId: collegeId
    });

    if(!collegeMatchCursor || collegeMatchCursor.count() === 0) {
      return undefined;
    }

    var collegeMatch = collegeMatchCursor.fetch()[0];

    if(!collegeMatch || !collegeMatch.messages || collegeMatch.messages.length === 0) {
      return undefined;
    }

    var count = getMatchUnreadMessagesCount(collegeMatch);

    if(count === 0) {
      return undefined;
    }

    return count > 99 ? "99+" : count;
  },
  currentCollegeName: function() {
    if(!currentCollegeId || currentCollegeId.get() === -1) {
      return "";
    }

    var college = Colleges.findOne({_id: currentCollegeId.get()});

    if(!college || !college.name) {
      return "Unknown college";
    }

    return college.name;
  }
});

Template.collegeChat.events({
  "click #pg-college-chat-bubble-area": function() {
    document.querySelector("#pg-college-chat-bar-area").setAttribute("data-active", "true");
  },
  "click #pg-college-chat-bar-header .icon-x": function() {
    document.querySelector("#pg-college-chat-bar-area").setAttribute("data-active", "false");
  },
  "click .pg-college-chat-bar-item": function(event) {
    currentCollegeId.set($(event.currentTarget).attr("data-college-id"));
  }
});

Template.collegeChatMessages.helpers({
  messages: function() {
    if(!currentCollegeId.get() || currentCollegeId.get() === -1) {
      return [];
    }

    var match = Matches.findOne({collegeId: currentCollegeId.get()});

    if(!match || !match.messages) {
      return [];
    }

    return match.messages;
  },
  collegeLogo: function(collegeId) {
    var college = Colleges.findOne({_id: currentCollegeId.get()});

    if(!college || !college.schoolLogo) {
      return "";
    }

    return college.schoolLogo;
  }
});
