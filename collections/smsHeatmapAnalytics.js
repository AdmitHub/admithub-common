SmsHeatmapAnalytics = new Mongo.Collection("smsHeatmapAnalytics");
SmsHeatmapAnalytics.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  areaCode: { type: String },
  messagingService: { type: String },
  total: { type: Number },
  unique: { type: Number },
}))