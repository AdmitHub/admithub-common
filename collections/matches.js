Matches = new Mongo.Collection('matches');
Matches.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "collegeId": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "highschoolId": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "created": fields.created_date(),

  "shareData": {type: Boolean, defaultValue: false},
  "archived": {type: Date, optional: true},

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
  "messages.$.sender": {type: String, allowedValues: ["student", "college", "admithub"]},
  "messages.$.read": {type: Boolean, optional: true},

  "encounters": {type: [Object], optional: true},
  "encounters.$.created": {type: Date},
  "encounters.$.source": {
    type: String,
    optional: true,
    allowedValues: [
      "Match workflow", "Dream college", "Atname match", "Message"
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
  "dismissed": {type: Boolean, optional: true},
  "encounters.$.location": {type: String, optional: true},
}));

// Denormalize matches onto "preferences.likes".
Matches.after.insert(function(uid, doc) {
  if (doc.collegeId) {
    return CollegeProfiles.update({userId: doc.userId}, {
      "$addToSet": {"preferences.likes": doc.collegeId}
    });
  }
});
Matches.after.remove(function(uid, doc) {
  if (doc.collegeId) {
    return CollegeProfiles.update({userId: doc.userId}, {
      "$pull": {"preferences.likes": doc.collegeId}
    });
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
