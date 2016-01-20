Matches = new Mongo.Collection('matches');
Matches.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "collegeId": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "highschoolId": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "created": fields.created_date(),

  "shareData": {type: Boolean, defaultValue: false},
  /*
    States for like/dislike/dismissal:

                    | like true  | like false |
    ----------------+------------+------------+
    dismissed true  | Unfollowed | Disliked   |
    ----------------+------------+------------+
    dismissed false |  Liked     |     x      |
    ----------------+------------+------------+

    The "like false" and "dismissed false" quadrant isn't used, it'd be a
    "hate follow" or something.

    Value of 'like' is denormalized into CollegeProfile.preferences.likes and
    CollegeProfile.preferences.dislikes, to avoid having to fetch collections
    of Matches all the time.
  */
  "like": {type: Boolean, defaultValue: true},
  "dismissed": {type: Boolean, optional: true},

  // "archived" is only for the college/highschool views.
  "archived": {type: Date, optional: true},

  // FIXME: update this impl to accord with #settings
  "transports": {type: Object, optional: true},
  "transports.email.unsubscribed": {type: Boolean, optional: true},
  "transports.web.unsubscribed": {type: Boolean, optional: true},
  "transports.sms": {type: Object, optional: true},
  "transports.sms.unsubscribed": {type: Boolean, optional: true},
  "transports.sms.sent": {type: Boolean, optional: true},

  "messages": {type: [Object], optional: true},
  "messages.$.created": {
    type: Date,
    autoform: {
      afFieldInput: {
        type: "datetime-local"
      }
    }
  },
  "messages.$.body": {type: String},
  "messages.$.sender": {type: String, allowedValues: ["student", "college", "highschool", "admithub"]},
  "messages.$.read": {type: Boolean, optional: true},

  "encounters": {type: [Object], optional: true},
  "encounters.$.created": {type: Date},
  "encounters.$.source": {
    type: String,
    optional: true,
    allowedValues: [
      "Match workflow", "Dream college", "Atname match", "Message", "Web like", "Unknown"
    ],
  },
  "encounters.$.eventId": {type: String, optional: true, regEx: SimpleSchema.RegEx.Id},

  // College-specific parts
  "hasVisited": {type: Boolean, optional: true},
  "wantsToVisit": {type: Boolean, optional: true},
  "legacy": {type: Boolean, optional: true},
  "consideringEarlyApply": {type: Boolean, optional: true},
  "collegeToken": {
    type: String,
    optional: true,
    autoValue: function(doc) {
      if (!this.isSet) {
        return Random.secret(20);
      }
    }
  },
  "studentToken": {
    type: String,
    optional: true,
    autoValue: function() {
      if (!this.isSet) {
        return Random.secret(20);
      }
    }
  },

  //XXX Legacy -- do not use
  "encounters.$.location": {type: String, optional: true},
}));

// Denormalize matches onto "preferences.likes".
var updateLikes = function(match) {
  if (match.collegeId) {
    var add, pull;
    if (match.like) {
      add = "preferences.likes";
      pull = "preferences.dislikes";
    } else {
      add = "preferences.dislikes";
      pull = "preferences.likes";
    }
    var update = {$addToSet: {}, $pull: {}};
    update.$addToSet[add] = match.collegeId;
    update.$pull[pull] = match.collegeId;
    return CollegeProfiles.update({userId: match.userId}, update);
  }
}
Matches.after.insert(function(uid, doc) {
  return updateLikes(doc);
});
Matches.after.remove(function(uid, doc) {
  if (doc.collegeId) {
    return CollegeProfiles.update({userId: doc.userId}, {
      "$pull": {
        "preferences.likes": doc.collegeId,
        "preferences.dislikes": doc.collegeId
      }
    });
  }
});
Matches.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.like !== this.previous.like) {
    return updateLikes(doc);
  }
});


Matches.deny({
  insert: function(userId, doc) {
    check(doc.userId, String);
    check(doc.collegeId, String);

    var college = Colleges.findOne(doc.collegeId);
    var collegeOfficer = CollegeOfficers.findOne({
      collegeId: doc.collegeId,
      officers: userId
    });

    return !college || !collegeOfficer;
  }
})
