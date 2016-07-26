Workflows = new Mongo.Collection("workflows");

Workflows.attachSchema(new SimpleSchema({
    "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    "name": {type: String},
    "messagingService": {type: String},
    "steps": {type: [
        new SimpleSchema({
            "prompt": {type: String}
        })
    ]}
}));
