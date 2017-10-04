SmsHeatmapAnalytics = new Mongo.Collection("smsHeatmapAnalytics");
SmsHeatmapAnalytics.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  areaCode: { type: String },
  messagingService: { type: String, optional: true },
  total: { type: Number },
  unique: { type: Number },
}))