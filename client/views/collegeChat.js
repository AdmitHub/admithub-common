var helpers = {
  notZero: function(value) {
    return value !== 0;
  },
  equal: function(a, b) {
    return a === b;
  },
  chatUser: function() {
    if(Meteor.user()) {
      return Meteor.user();
    }

    if(Session.get("user_id")) {
      return Meteor.users().find(Session.get("user_id")).fetch();
    }

  },
  matchesWithMessages: function() {
    if(helpers.chatUser()) {
      return Matches.find({userId: helpers.chatUser()._id}, {collegeId: 1, messages: 1}).fetch();
    }

    return [];
  },
  matchMessagesUnreadCount: function(match) {
    if(!match && this.messages) {
      match = this;
    }

    if(!match || !match.messages || match.messages.length === 0) {
      return 0;
    }

    var count = 0;

    for(var i in match.messages) {
      var message = match.messages[i];

      if(message.sender === "student") {
        count = 0;
      } else if(!message.read){
        count++;
      }
    }

    return count;
  },
  totalMatchMessagesUnreadCount: function() {
    var matches = helpers.matchesWithMessages();

    var count = 0;

    for(var i in matches) {
      var match = matches[i];
      count += helpers.matchMessagesUnreadCount(match);
    }

    return count;
  },
  collegeLogo: function(collegeId) {
    var college = Colleges.findOne(collegeId);

    if(!college || !college.schoolLogo) {
      return "";
    }

    return college.schoolLogo;
  },
  collegeName: function(collegeId) {
    if(!collegeId || collegeId === -1) {
      return "Select a college chat";
    }

    var college = Colleges.findOne(collegeId);

    return !college || !college.name ? "Unknown college" : college.name;
  },
  currentCollegeLogo: function() {
    return helpers.collegeLogo(currentCollegeId.get());
  },
  currentCollegeName: function() {
    return helpers.collegeName(currentCollegeId.get());
  },
  currentCollegeMessages: function() {
    if(currentCollegeId.get() === -1) {
      return [];
    }

    var match = Matches.findOne({collegeId: currentCollegeId.get()});

    if(!match || !match.messages || match.messages.length === 0) {
      return [];
    }

    return match.messages;
  }
};

var currentCollegeId;
Template.collegeChat.created = function() {
  currentCollegeId = new ReactiveVar(-1);
};

Template.collegeChat.helpers(helpers);

Template.collegeChat.events({
  "error .can-fallback": function(event) {
    $(event.currentTarget).attr("src", "https://s3-us-west-2.amazonaws.com/admithub-partner-logos/varsity+owl.jpg");
  },
  "click #cc-main-bar .cc-icon": function(event) {
    currentCollegeId.set(event.currentTarget.getAttribute("data-college-id"));
    Meteor.call("markMatchMessagesRead", currentCollegeId.get());
  },
  "click #cc-trigger": function() {
    $("#cc-main").attr("data-active", "true");
  },
  "click #cc-main-header .icon-x": function() {
    $("#cc-main").attr("data-active", "false");
  },
  "click #cc-main-chat-send button": function() {
    var body = $("#cc-main-chat-send textarea").val();

    var match = Matches.findOne({collegeId: currentCollegeId.get()});
    var errorArea = $("#cc-main-chat-send-error");

    if(!match) {
      errorArea.text("Failed to send message: Internal error");
      errorArea.css({
        opacity: 1
      });
      console.error("Can not find college match id");
      return;
    } else {
      errorArea.css({
        opacity: 0
      });
    }

    if(body && body.length !== 0) {
      Meteor.call("sendMatchMessage", match._id, body);
      $("#cc-main-chat-send textarea").val("");
    } else {
      errorArea.text("Message can not be empty");
      errorArea.css({
        opacity: 1
      });
    }
  }
});
