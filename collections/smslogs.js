SmsLogs = new Mongo.Collection("smslogs");
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
  "mediaFiles.$.url": {type: String},
  "mediaFiles.$.contentType": {type: String, optional: true},
  "mediaFiles.$.deleted": {type: Boolean, defaultValue: false},
  userId: {type: String, optional: true},
  workflow: {type: String, optional: true},
  messagingService: {type: String, optional: true},
  aiLog: {type: String, optional: true},
  error: {type: Boolean, defaultValue: false},
  source: {type: String, optional: true},
  testUser: {type: Boolean, optional: true, defaultValue: false},
  transport: {type: String, allowedValues: ["web", "twilio", "facebook", "email"], optional: false},
  msgParts: {type: Number, optional: true}
}));
if (Meteor.isServer) {
  SmsLogs.allow({
    insert: function(userId, doc) {
      return (
        doc.userId === userId &&
        !!doc.body &&
        doc.transport === "web" &&
        doc.incoming === true &&
        !_.any([
          doc.messageSid, doc.smsSid, doc.accountSid,
          doc.from, doc.to, doc.mediaFiles, doc.error
        ])
      );
    }
  });
}

SmsLogs.after.insert((insertingUserId, doc) => {
  const smsLogId = doc._id;

  // If the user is a test user, set the smslog as a test sms log
  Meteor.users.findOne(doc.userId).then(user => {
    if (user && user.testUser) {
      SmsLogs.update({_id: smsLogId}, {$set: {testUser: true}});
    }
  })

  // If this smsLog has a body and userId
  if(doc.body && doc.body.length > 0 && doc.userId) {
    BrandedColleges.findOne({messagingService: doc.messagingService}).then(college => {
      console.log("================messagingService: ", messagingService)
      if (!college) throw new Error('college-not-found');

      BrandedUserProfiles.update({userId: doc.userId, collegeId: college._id}, {
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

    // TODO legacy. Remove when not needed - AR
    Meteor.users.update({_id: doc.userId }, { $set: { lastContacted: new Date(), lastMessageId: smsLogId } });
  }
});
