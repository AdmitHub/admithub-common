HighschoolConversations = new Mongo.Collection('highschoolConversations')
HighschoolConversations.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  // userId reference
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  highschoolId: {type: String, regEx: SimpleSchema.RegEx.Id},
  'messages': {type: [Object], optional: true},
  'messages.$.created': {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'datetime-local'
      }
    }
  },
  'messages.$.body': {type: String},
  'messages.$.sender': {type: String, allowedValues: ['student', 'highschool', 'admithub']},
  'messages.$.read': {type: Boolean, optional: true},

  'transports': {
    type: Object,
    optional: true
  },
  'transports.sms': {
    type: Object,
    optional: true
  },
  'transports.sms.unsubscribed': {
    type: Boolean,
    optional: true
  },
  'transports.sms.sent': {
    type: Boolean,
    optional: true
  },
  'transports.email.unsubscribed': {
    type: Boolean,
    optional: true
  },
  'transports.web.unsubscribed': {
    type: Boolean,
    optional: true
  }
}))
