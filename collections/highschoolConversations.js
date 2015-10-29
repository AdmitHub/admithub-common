HighschoolConversations = new Mongo.Collection("highschoolConversations");
HighschoolConversations.attachSchema({
  // userId reference
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  highschoolId: {type: String, regEx: SimpleSchema.RegEx.Id},
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
  "messages.$.sender": {type: String, allowedValues: ["student", "highschool", "admithub"]},
  "messages.$.read": {type: Boolean, optional: true},
});