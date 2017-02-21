BrandedApplicantConversations = new Mongo.Collection("brandedapplicantconversations");
BrandedApplicantConversations.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  applicantId: {type: String}, // this could very well be a Mongo-style ID
  brandedCollegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  userId: {type: String, optional: true},
  messagingService: {type: String, optional: true},
  created: {type: Date, optional: true}, // additional createdAt date for ease of query in metabase
  messages: {type: [Object]},
  handled: {type: Boolean, optional: true, defaultValue: false},
  "messages.$.created": {type: Date},
  "messages.$.sender": {type: String, allowedValues: ["student", "college", "admithub"]},
  "messages.$.email": {type: String, optional: true},
  "messages.$.body": {type: String},
  "messages.$.unverified": {type: Boolean, optional: true},
  "messages.$.auto": {type: Boolean, optional: true},
  "messages.$.logId": {type: String, optional: true}
}));
