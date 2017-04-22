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
  'nextState': {type: Object, blackbox: true}
}))

