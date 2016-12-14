WorkflowResponses = new Mongo.Collection("workflowResponses");
WorkflowResponses.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  userId: fields.string(),
  workflow: fields.string(),
  step: fields.string(),
  response: {
    type: Object,
    blackbox: true
  },
  created: {
    type: Date
  },
}));
