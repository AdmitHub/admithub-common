Workflows = new Mongo.Collection("workflows");

Workflows.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "name": {type: String},
  "humanName": {type: String, optional: true},
  "description": {type: String, optional: true},
  "messagingService": {type: String, optional: true},
  "steps": {type: [
    new SimpleSchema({
      "name": {type: String, optional: true},
      "prompt": {type: String, optional: true},
      "options": {type [String], optional: true},
      "editable": {type: Boolean},
    })
  ]}
}));
