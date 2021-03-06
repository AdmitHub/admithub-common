ScheduledMessages = new Mongo.Collection('scheduledMessages')
ScheduledMessages.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String, defaultValue: ''},
  description: {type: String, defaultValue: ''},
  collection: {type: String},
  createdAt: {type: Date},
  messagingService: {type: String},
  scheduledAt: {type: Date},
  allowCanTextFalse: {type: Boolean, optional: true}, // override can text false limitation for opt in wf's
  batchSize: {type: Number, optional: true},
  completed: {type: Boolean, defaultValue: false},
  context: {type: String, optional: true},
  deliveryFailureUsers: {type: [String], defaultValue: []},
  endDate: {type: Date, optional: true},
  hidden: {type: Boolean, optional: true},
  isIntro: {type: Boolean, optional: true, defaultValue: false},
  importReportId: {type: String, optional: true},
  message: {type: String, optional: true},
  messagedUsers: {type: [String], defaultValue: []},
  note: {type: String, optional: true},
  onGoing: {type: Boolean, optional: true},
  optOutUsers: {type: [String], defaultValue: []},
  paused: {type: Boolean, optional: true},
  query: {type: String, optional: true},
  recipientLabel: {type: String, optional: true},
  scheduled: {type: Boolean, optional: true},
  sendingUser: {type: String, optional: true},
  sent: {type: Boolean, optional: true},
  sentDate: {type: Date, optional: true},
  startDate: {type: Date, optional: true},
  started: {type: Boolean, optional: true},
  test: {type: Boolean, optional: true},
  users: {type: [String], optional: true},
  usersContacted: {type: Number, optional: true},
  userSearch: {type: Object, blackbox: true, optional: true},
  weekends: {type: Boolean, optional: true},
  workflow: {type: String, optional: true},
  workflowHumanName: {type: String, optional: true}
}))
