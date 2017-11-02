Workflows = new Mongo.Collection('workflows')

Workflows.attachSchema(new SimpleSchema({
  '_id': {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  'name': {type: String, optional: true},
  'humanName': {type: String, optional: true},
  'description': {type: String, optional: true},
  'messagingService': {type: String, optional: true},
  'hidden': {type: Boolean, defaultValue: false, optional: true},
  'custom': {type: Boolean, optional: true},
  'steps': {
    type: Object,
    blackbox: true
  },
  "expirationLength": {type: Number, optional: true},
  "createdAt": {type: Date, optional: true},
  "updatedAt": {type: Date, optional: true},
  "sentToUsers": {type: Boolean, optional: true},
  "oneOff": {type: Boolean, optional: true, defaultValue: false},
  "reminders": { type: Array, optional: true },
  "reminders.$": {
    type: new SimpleSchema({
      'query': { type: Object, blackbox: true },
      'message': { type: String },
      'after': { type: Number }
    })
  },
  "inputContexts": { type: Array, optional: true, defaultValue: [] },
  "inputContexts.$": { type: String, optional: true,},
  "automaticIntroduction": { type: Boolean, optional: true}
}));
