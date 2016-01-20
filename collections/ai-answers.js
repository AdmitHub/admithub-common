AIAnswers = new Mongo.Collection("ai.answers");
AIAnswers.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  answer: {type: String},
  topic: {type: String}
}));