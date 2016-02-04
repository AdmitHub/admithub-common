AIUnderstandings = new Mongo.Collection("ai.understandings");
AIUnderstandings.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  topic: {
    type: String,
    unique: true
  },
  questionGroups: {
    type: [Object],
    minCount: 1,
    custom: function () {
      const uniqs = _.chain(this.value)
        .map(function(item) {
          return (item.inputContexts || []).sort()
        })
        .map(function(contexts) {
          return contexts.join(';')
        })
        .uniq()
        .value();

      if (uniqs.length !== this.value.length) {
        return 'inputContexts must be unique'
      }
    }
  },
  "questionGroups.$.inputContexts": {
    type: [String],
    minCount: 0,
    autoValue: function () {
      if (this.value == null) {
        return []
      }
    }
  },
  "questionGroups.$.questions": {
    type: [String],
    minCount: 1
  },
  answer: {
    type: String,
    autoform: {
      rows: 3,
      template: 'answer'
    }
  },
  outputContexts: {
    type: [String],
    minCount: 0,
    autoValue: function () {
      if (this.value == null) {
        return []
      }
    }
  }
}));

AIUnderstandings.allow({
  insert: function(userId) {
    return Roles.userIsInRole(userId, "Admin");
  },
  update: function(userId) {
    return Roles.userIsInRole(userId, "Admin");
  },
  remove: function(userId) {
    return Roles.userIsInRole(userId, "Admin");
  }
});
