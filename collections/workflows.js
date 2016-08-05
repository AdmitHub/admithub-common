Workflows = new Mongo.Collection("workflows");

Workflows.attachSchema(new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  "name": {type: String},
  "messagingService": {type: String, optional: true},
  "steps": {type: [
    new SimpleSchema({
      "prompt": {type: String, optional: true},
      "editable": {type: Boolean},
    })
  ]}
}));
