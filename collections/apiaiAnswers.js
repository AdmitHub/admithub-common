APIAIAnswers = new Mongo.Collection("APIAIAnswers");

APIAIAnswers.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  topic: {
    type: String
  },
  answer: {
    type: String
  }
}));