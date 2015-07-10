Matches = new Mongo.Collection('matches');
Matches.attachSchema({
  "collegeId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "created": fields.created_date(),
  // Should only be set if messages is empty.
  "dismissed": {type: Boolean, defaultValue: false},
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