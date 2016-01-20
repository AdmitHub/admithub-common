AILogs = new Mongo.Collection("ai.logs");
AILogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  created: {type: Date},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  question: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]},
  responseAction: {type: String},
  response: {type: String},
  handled: {type: Boolean, defaultValue: false},
  handleAction: {type: String, optional: true}
}));