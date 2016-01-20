AIIntents = new Mongo.Collection("ai.intents");
AIIntents.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  topic: {type: String},
  questions: {type: [String]},
  subject: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]}
}));