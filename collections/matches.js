Matches = new Mongo.Collection('matches');
Matches.attachSchema({
  "collegeId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "created": fields.created_date(),
  // Should only be set if messages is empty.
  "dismissed": {type: Boolean, defaultValue: false},
  "bot": {type: Boolean, defaultValue: false},
  "eventId": {type: String, optional: true},
  "archived": {type: Date, optional: true},
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
  "messages.$.sender": {type: String, allowedValues: ["student", "college", "admithub"]}
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
