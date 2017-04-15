TwilioAccounts = new Mongo.Collection('twilioAccounts')
TwilioAccounts.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  accountSid: {
    type: String
  },
  authToken: {
    type: String
  }
}))
