var getUnreadMessages = function() {
  return Matches.find({
        "userId": Meteor.userId(),
        "messages": {
          $elemMatch: {
            "read": false,
            $or: [
              {"sender": "college"},
              {"sender": "admithub"}
            ]
          }
        }
      });
};

Template.collegeChat.helpers({
  hasUnreadMessages: function() {
    return getUnreadMessages().count() > 0;
  },
  unreadMessageCount: function() {
    var unreadMessages = getUnreadMessages();

    if(unreadMessages.count() > 99) {
      return "99+";
    }

    return unreadMessages.count();
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
    var unreadMessages = getUnreadMessages().fetch();

    for(var match in unreadMessages) {
      if(match.collegeId === collegeId) {
        return match.messages.length;
      }
    }
    console.log("NOOOO", getUnreadMessages().fetch());
    return false;
  }
});

Template.collegeChat.events({
  "click #pg-college-chat-bubble-area": function() {
    document.querySelector("#pg-college-chat-bar-area").setAttribute("data-active", "true");
  },
  "click #pg-college-chat-bar-header .icon-x": function() {
    document.querySelector("#pg-college-chat-bar-area").setAttribute("data-active", "false");
  }
});
