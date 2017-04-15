SmsLogs = new Mongo.Collection('smslogs')
SmsLogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  createdAt: {type: Date},
  incoming: {type: Boolean, defaultValue: false},
  inReplyTo: {type: String, optional: true},
  messageSid: {type: String, optional: true},
  smsSid: {type: String, optional: true},
  accountSid: {type: String, optional: true},
  to: {type: String, optional: true},
  from: {type: String, optional: true},
  body: {type: String, optional: true},
  mediaFiles: {type: [Object], optional: true},
  'mediaFiles.$.url': {type: String},
  'mediaFiles.$.contentType': {type: String, optional: true},
  'mediaFiles.$.deleted': {type: Boolean, defaultValue: false},
  userId: {type: String, optional: true},
  workflow: {type: String, optional: true},
  messagingService: {type: String, optional: true},
  aiLog: {type: String, optional: true},
  error: {type: Boolean, defaultValue: false},
  source: {type: String, optional: true},
  transport: {type: String, allowedValues: ['web', 'twilio', 'facebook', 'email'], optional: false},
  msgParts: {type: Number, optional: true}
}))
if (Meteor.isServer) {
  SmsLogs.allow({
    insert: function (userId, doc) {
      return (
        doc.userId === userId &&
        !!doc.body &&
        doc.transport === 'web' &&
        doc.incoming === true &&
        !_.any([
          doc.messageSid, doc.smsSid, doc.accountSid,
          doc.from, doc.to, doc.mediaFiles, doc.error
        ])
      )
    }
  })
}
SmsLogs.after.insert((smsLogId, doc) => {
  if (doc.body.length > 0 && doc.userId) {
    return Users.update({_id: doc.userId }, { $set: { lastContacted: new Date(), lastMessageId: smsLogId } })
  }
})
