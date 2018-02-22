BrandedApplicantConversations = new Mongo.Collection('brandedapplicantconversations')
BrandedApplicantConversations.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  applicantId: {type: String}, // this could very well be a Mongo-style ID
  brandedCollegeId: {type: String, optional: true},
  userId: {type: String, optional: true},
  messagingService: {type: String, optional: true},
  created: {type: Date, optional: true}, // additional createdAt date for ease of query in metabase
  messages: {type: [Object]},
  handled: {type: Boolean, optional: true, defaultValue: false},
  'messages.$.body': {type: String},
  'messages.$.created': {type: Date},
  'messages.$.auto': {type: Boolean, optional: true},
  'messages.$.email': {type: String, optional: true},
  'messages.$.queryLogId': {type: String, optional: true},
  'messages.$.sender': {type: String, allowedValues: ['student', 'college', 'admithub']},
  'messages.$.smsLogId': {type: String, optional: true},
  'messages.$.unverified': {type: Boolean, optional: true}
}))
