Matches = new Mongo.Collection('matches');
Matches.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "collegeId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "created": fields.created_date(),
  // Should only be set if messages is empty.
  "dismissed": {type: Boolean, defaultValue: false},
  "archived": {type: Date, optional: true},
  "messages": {type: [Object], optional: true},
  "transports": {
    type: Object,
    optional: true
  },
  "transports.sms": {
    type: Object,
    optional: true
  },
  "transports.sms.unsubscribed": {
    type: Boolean,
    optional: true
  },
  "transports.sms.sent": {
    type: Boolean,
    optional: true
  },
  "transports.email.unsubscribed": {
    type: Boolean,
    optional: true
  },
  "transports.web.unsubscribed": {
    type: Boolean,
    optional: true
  },
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
  "encounters.$.location": {
    type: String,
    optional: true,
    allowedValues: ["web", "sms"]
  },
  "encounters.$.eventId": {type: String, optional: true, regEx: SimpleSchema.RegEx.Id}
}));

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
