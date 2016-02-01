AIIntents = new Mongo.Collection("ai.intents");
AIIntents.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  topic: {type: String},
  questions: {type: [String]},
  subject: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]}
}));

AIIntents.allow({
  insert: function(userId) {
    return Roles.userIsInRole(userId, "Admin", Roles.GLOBAL_GROUP);
  },
  update: function(userId) {
    return Roles.userIsInRole(userId, "Admin", Roles.GLOBAL_GROUP);
  },
  remove: function(userId) {
    return Roles.userIsInRole(userId, "Admin", Roles.GLOBAL_GROUP);
  }
});
