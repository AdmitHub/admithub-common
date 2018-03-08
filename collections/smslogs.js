SmsLogs = new Mongo.Collection('smslogs')
SmsLogs.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  createdAt: {type: Date},
  aiLog: {type: String, optional: true},
  incoming: {type: Boolean, defaultValue: false},
  accountSid: {type: String, optional: true},
  body: {type: String, optional: true},
  dialogId: {type: String, optional: true},
  error: {type: Boolean, defaultValue: false},
  facebookId: {type: String, optional: true},
  from: {type: String, optional: true},
  inReplyTo: {type: String, optional: true},
  mediaFiles: {type: [Object], optional: true},
  'mediaFiles.$.url': {type: String},
  'mediaFiles.$.contentType': {type: String, optional: true},
  'mediaFiles.$.deleted': {type: Boolean, defaultValue: false},
  messageSid: {type: String, optional: true},
  messagingService: {type: String, optional: true},
  msgParts: {type: Number, optional: true},
  scheduledMessageId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  senderId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  smsSid: {type: String, optional: true},
  source: {type: String, optional: true},
  testUser: {type: Boolean, optional: true, defaultValue: false},
  to: {type: String, optional: true},
  transport: {type: String, allowedValues: ["web", "twilio", "facebook", "email"], optional: false},
  userNumber: {type: String, optional: true},
  userId: {type: String, optional: true}
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

SmsLogs.after.insert((insertingUserId, doc) => {
  const smsLogId = doc._id;

  // If the user is a test user, set the smslog as a test sms log
  BrandedUserProfiles.findOne(doc.userId).then(user => {
    if (user && user.testUser) {
      SmsLogs.update({_id: smsLogId}, {$set: {testUser: true}});
    }
  })

  //If this smsLog has a body and userId
  if(doc.body && doc.body.length > 0 && doc.userId && doc.messagingService !== 'oli') {
    BrandedColleges.findOne({messagingService: doc.messagingService}).then(college => {
      if (!college) throw new Error('college-not-found');

      BrandedUserProfiles.update({_id: doc.userId, collegeId: college._id}, {
        $set: {
          [doc.incoming ? 'smsInfo.lastIncomingMessageAt' : 'smsInfo.lastOutgoingMessageAt']: new Date(),
          [doc.incoming ? 'smsInfo.lastIncomingMessageBody' : 'smsInfo.lastOutgoingMessageBody']: doc.body,
          [doc.incoming ? 'smsInfo.lastIncomingMessageId' : 'smsInfo.lastOutgoingMessageId']: smsLogId,
          'smsInfo.lastMessageAt': new Date(),
          'smsInfo.lastMessageBody': doc.body,
          'smsInfo.lastMessageId': smsLogId
        }
      });
    })

  }
})
