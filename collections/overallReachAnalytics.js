OverallReachAnalytics = new Mongo.Collection("overallReachAnalytics");
OverallReachAnalytics.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id},
  messagingService: { type: String },
  createdAt: { type: Date },
  weekNumber: { type: Number },
  year: {type: Number},
  updatedAt: { type: Date },
  uniqueUsersReached: { type: Number },
  ignore: { type: Boolean, optional: true, defaultValue: false }
}));
