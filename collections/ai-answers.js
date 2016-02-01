AIAnswers = new Mongo.Collection("ai.answers");
AIAnswers.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  answer: {
    type: String,
    autoform: {
      rows: 3
    }
  },
  topic: {type: String}
}));

AIAnswers.allow({
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
