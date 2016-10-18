Workflows = new Mongo.Collection("workflows");

Workflows.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "name": {type: String},
  "humanName": {type: String, optional: true},
  "description": {type: String, optional: true},
  "messagingService": {type: String, optional: true},
  "hidden": {type: Boolean, defaultValue: false},
  "steps": {
    type: Object,
    blackbox: true
  }
}));
