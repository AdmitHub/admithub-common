OverallReachAnalytics = new Mongo.Collection("overallReachAnalytics");
OverallReachAnalytics.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  messagingService: { type: String, optional: true },
  usersReached: { type: Number },
  date: { type: Date },
}))