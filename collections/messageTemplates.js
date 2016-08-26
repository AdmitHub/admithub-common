MessageTemplates = new Mongo.Collection("messageTemplates");
MessageTemplates.attachSchema(new SimpleSchema({
  label: {type: String},
  value: {type: String},
  description: {type: String}
}));
