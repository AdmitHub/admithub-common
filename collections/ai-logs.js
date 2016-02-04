AILogs = new Mongo.Collection("ai.logs");
AILogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  created: fields.created_date(),
  userId: {type: String, regEx: SimpleSchema.RegEx.Id}, // User
  question: {type: String},
  outputContexts: {type: [String]},
  inputContexts: {type: [String]},
  responseAction: {type: String, optional: true},
  response: {type: String, optional: true},
  messagingService: {type: String},
  handled: {type: Boolean, defaultValue: false},
  needsReview: {type: Boolean, defaultValue: false},
  handledBy: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, // User
  handledDate: {type: Date, optional: true},
  handledAction: {
    type: [String],
    allowedValues: ["needsReview", "humanResponse", "emailCollege"],
    optional: true
  },
  reviewedBy: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, // User
  reviewedDate: {type: Date, optional: true},
  reviewedAction: {type: Object, blackbox: true, optional: true},
  humanResponse: {type: String, optional: true},
  error: {type: String, optional: true}
}));

// Discussion of categories: https://github.com/AdmitHub/admin/issues/15#issuecomment-175178035
AILogs.getCategory = function(log) {
  if (log.error) {
    return "error";
  }
  if (log.response && /^\/(?!control).+/.test(log.responseAction)) {
    return "valid";
  }
  if (log.response && /^smalltalk.*/.test(log.responseAction)) {
    return "smalltalk";
  }
  if (!log.response && /^\/control\/human/.test(log.responseAction)) {
    return "sendToHuman";
  }
  if (!log.response && /^(?!\/control).+/.test(log.responseAction)) {
    return "notFound";
  }
  if (log.responseAction === '/control/lackOfUnderstanding') {
    return "lackOfUnderstanding";
  }
};
AILogs.getPrevious = function(log, limit) {
  limit = limit === undefined ? 1 : limit;
  return AILogs.find({
    userId: log.userId,
    created: {$lt: log.created}
  }, {
    limit: limit
  })
};
AILogs.getNext = function(log, limit) {
  limit = limit === undefined ? 1 : limit;
  return AILogs.find({
    userId: log.userId,
    created: {$gt: log.created}
  }, {
    limit: limit
  });
};
AILogs.getUnderstanding = function(log) {
  limit = limit === undefined ? 1 : limit;
  return AIUnderstandings.findOne({
    topic: log.responseAction,
  });
};

AILogs.allow({
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
