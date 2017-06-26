Dialogs = new Mongo.Collection('dataWorkflows')

Dialogs.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'name': {type: String, optional: true},
  'humanName': {type: String, optional: true},
  'description': {type: String, optional: true},
  'messagingService': {type: String, optional: true},
  'createdAt': {type: Date, optional: true},
  'updatedAt': {type: Date, optional: true},
  'sentToUsers': {type: Boolean, optional: true},
  'initialState': {type: String , optional: false},
  'states': {type: [String], optional: true},
}))

States = new Mongo.Collection('states')

States.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'name': {type: String, optional: true},
  'promptType': {type: String, optional: false},
  'prompt': {type: String, optional: true},
  'skip': {type: Object, optional: true},
  'parentDialog': {type: String, optional: false},
  'nextStates': {type: Object, blackbox: true},
  'skip': {type: Object, blackbox: true, optional: true},
  'range': {type: new SimpleSchema({
    min: {type: Number, optional: false},
    max: {type: Number, optional: false}
  }), optional: true}
}))

MessageLogs = new Mongo.Collection('messageLogs')

MessageLogs.attachSchema(new SimpleSchema({
  '_id': {type: String},
  'media': {type: String, optional: true},
  'message': {type: String, optional: true},
  'type': {type: String, optional: true},
  'userNumber': {type: String, optional: true},
  'facebookId': {type: String, optional: true},
  'createdAt': {type: Date},
}))

