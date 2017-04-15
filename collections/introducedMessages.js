IntroducedMessages = new Mongo.Collection('introducedMessages')
IntroducedMessages.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  query: {type: String, optional: true},
  sentDate: {type: Date},
  messagingService: {type: String, optional: true},
  collection: {type: String, optional: true},
  workflow: {type: String, optional: true},
  message: {type: String, optional: true},
  usersContacted: {type: Number, optional: true},
  users: {type: [String], optional: true},
  note: {type: String, optional: true},
  scheduled: {type: Boolean, optional: true},
  userSearch: {type: Object, blackbox: true, optional: true}
}))
