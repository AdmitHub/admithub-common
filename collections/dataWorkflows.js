Dialogs = new Mongo.Collection('Dialogs')

Dialogs.attachSchema(new SimpleSchema({
  '_id': {type: String},
  'name': {type: String},
  'initialState': {type: String},
  'createdAt': {type: Date},
  'updatedAt': {type: Date},
  'humanName': {type: String, optional: true},
  'description': {type: String, optional: true},
  'messagingService': {type: String, optional: true},
  'sentToUsers': {type: Boolean, optional: true},
}))

DialogStates = new Mongo.Collection('dialogStates')

DialogStates.attachSchema(new SimpleSchema({
  '_id': {type: String},
  'name': {type: String},
  'nextStateIds': {type: Object, blackbox: true, optional: true},
  'parentDialog': {type: String},
  'pause': {type: Number, optional: true},
  'prompt': {type: String, optional: true},
  'reply': {type: Boolean},
  'validReplies': {type: Object, blackbox: true, optional: true}
}))

MessageLogs = new Mongo.Collection('messageLogs')

MessageLogs.attachSchema(new SimpleSchema({
  '_id': {type: String},
  'createdAt': {type: Date},
  'message': {type: String},
  'type': {type: String},
  'userNumber': {type: String},
  'media': {type: String, optional: true}
}))

