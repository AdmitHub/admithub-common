SmsAnalytics = new Mongo.Collection("smslogAnalytics");
SmsAnalytics.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
   date: { type: Date },
  week: {type: Number },
  year: { type: Number },
  messagingService: { type: String },
  sent: { type: Number },
  received: { type: Number },
  sentUnique: { type: Number, optional: true},
  receivedUnique: {type: Number, optional: true}
}))