AILogs = new Mongo.Collection("ai.logs");
AILogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  created: fields.created_date(),
  userId: {type: String, regEx: SimpleSchema.RegEx.Id}, // User
  question: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]},
  responseAction: {type: String, optional: true},
  response: {type: String, optional: true},
  messagingService: {type: String},
  handled: {type: Boolean, defaultValue: false},
  needsReview: {type: Boolean, defaultValue: false},
  handledBy: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, // User
  handledDate: {type: Date, optional: true},
  handleAction: {type: String, optional: true},
  humanResponse: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, //AILog
  error: {type: String, optional: true}
}));