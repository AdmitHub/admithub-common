SmsLogs = new Mongo.Collection("smslogs");
SmsLogs.attachSchema(new SimpleSchema({
  createdAt: {type: Date},
  incoming: {type: Boolean, defaultValue: false},
  inReplyTo: {type: String, optional: true},
  messageSid: {type: String, optional: true},
  smsSid: {type: String, optional: true},
  accountSid: {type: String, optional: true},
  to: {type: String},
  from: {type: String, optional: true},
  body: {type: String, optional: true},
  mediaFiles: {type: [Object], optional: true},
  "mediaFiles.$.url": {type: String},
  "mediaFiles.$.contentType": {type: String, optional: true},
  "mediaFiles.$.deleted": {type: Boolean, defaultValue: false},
  userId: {type: String, optional: true},
  workflow: {type: String, optional: true},
  error: {type: Boolean, defaultValue: false}
}));
