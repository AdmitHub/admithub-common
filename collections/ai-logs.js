AILogs = new Mongo.Collection("ai.logs");
AILogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  created: {type: Date},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  question: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]},
  responseAction: {type: String, optional: true},
  response: {type: String, optional: true},
  messagingService: {type: String},
  handled: {type: Boolean, defaultValue: false},
  handledBy: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  handledDate: {type: Date, optional: true},
  handleAction: {type: String, optional: true},
  error: {type: String, optional: true}
}));