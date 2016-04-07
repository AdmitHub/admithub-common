BrandedApplicantConversations = new Mongo.Collection("brandedapplicantconversations");
BrandedApplicantConversations.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  applicantId: {type: String}, // this could very well be a Mongo-style ID
  brandedCollegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  messages: {type: [Object]},
  "messages.$.created": {type: Date},
  "messages.$.sender": {type: String, allowedValues: ["student", "college", "admithub"]},
  "messages.$.email": {type: String, optional: true},
  "messages.$.body": {type: String}
}));
