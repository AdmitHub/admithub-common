Dialogs = new Mongo.Collection('dialogs')

Dialogs.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'contexts': {type: [String], optional: false, defaultValue: []},
  'initialState': {type: String, optional: false},

  'converted': {type: Boolean, optional: true}, // a flag to show that the dialog was converted from a data workflow by script
  'createdAt': {type: Date, optional: true},
  'description': {type: String, optional: true},
  'expirationLength': {type: Number, optional: true},
  'hidden': {type: Boolean, optional: true},
  'humanName': {type: String, optional: true},
  'isIntro': {type: Boolean, optional: true, defaultValue: false},
  'messagingService': {type: String, optional: true},
  'name': {type: String, optional: true},
  'reminders': {type: [Object], blackbox: true, optional: true},
  'sentToUsers': {type: Boolean, optional: true},
  'states': {type: [String], optional: true},
  'updatedAt': {type: Date, optional: true},
  'metadata': {
    type: new SimpleSchema({
      'createdBy': {type: String, optional: false},
      'createdVia': {type: String, optional: false}
    }),
    optional: true
  }
}))

DialogStates = new Mongo.Collection('dialogStates')

DialogStates.attachSchema(new SimpleSchema({
  '_id': {type: String, optional: true},
  'contexts': {type: [String], optional: false, defaultValue: []},
  'parentDialog': {type: String, optional: false},
  'prompt': {type: String, optional: false, defaultValue: ''},
  'promptType': {type: String, optional: false},

  'converted': {type: String, optional: true},
  'createdAt': {type: Date, optional: true},
  'enterActions': {type: [Object], blackbox: true, optional: true},
  'exitActions': {type: [Object], blackbox: true, optional: true},
  'name': {type: String, optional: true},
  'media': {type: String, optional: true},
  'multipleChoices': {
    type: [new SimpleSchema({
      prompt: {type: String, optional: false}
    })],
    optional: true
  },
  'nextStates': {type: Object, blackbox: true},
  'openingAiResponseState': {type: Boolean, optional: true},
  'openPromptLabel': {type: String, optional: true},
  'pauseTime': {type: Number, optional: true},
  'range': {
    type: new SimpleSchema({
      min: {type: Number, optional: false},
      max: {type: Number, optional: false}
    }),
    optional: true
  },
  'skip': {
    type: new SimpleSchema({
      'query': {type: String}
    }),
    optional: true
  },
  'updatedAt': {type: Date, optional: true}
}))
