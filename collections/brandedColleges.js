BrandedColleges = new Mongo.Collection('brandedcolleges')
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, optional: true},
  messagingService: {type: String},
  emailDomains: {type: [String]},
  abbr: {type: String, optional: true}, // GSU
  primaryBrandColor: {type: String, optional: true},
  aiSubject: {type: String},
  animal: {type: String, optional: true}, // Panther
  collection: {type: String, optional: true},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  counselors: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  csvTransformPipeline: {type: [String], optional: true, defaultValue: []},
  customQueryFields: {type: [String], optional: true, defaultValue: []},
  dateAccepted: {type: String, optional: true},
  dateScholarship: {type: String, optional: true},
  departments: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  dialogSettings: {type: new SimpleSchema({
    unknownStudentDialogBotOn: {type: String, optional: true},
    unknownStudentDialogBotOff: {type: String, optional: true},
    knownNonContactedStudentDialog: {type: String, optional: true},
    botOffDialog: {type: String, optional: true},
    createAndIntroDialog: {type: String, optional: true},
    botOffNoDialog: {type: Boolean, optional: true},
    finishedConversationDialog: {type: String, optional: true}
  }), optional: true},
  disabledFeatures: {type: [String], defaultValue: []},
  emailPrefix: {type: String, optional: true},
  enabledFeatures: {type: [String], defaultValue: [], optional: true},
  facebookId: {type: String, optional: true},
  filterOn: {type: Boolean, optional: true},
  hashtag: {type: String, optional: true}, // include the hash
  infoGatheringBot: {type: String, optional: true}, //dialog scheduled after the initial dialog in an open bot
  intentDeadline: {type: Date, optional: true}, // june 1
  internalFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  introKnownProspectBotPhoto: {type: String, optional: true, defaultValue: ''},
  linkAcceptAid: {type: String, optional: true},
  linkAdmit: {type: String, optional: true},
  linkCounselors: {type: String, optional: true},
  linkIncompleteApplication: {type: String, optional: true},
  linkFafsa: {type: String, optional: true},
  linkFinAid: {type: String, optional: true},
  linkIntentToEnroll: {type: String, optional: true},
  linkOrientationChecklist: {type: String, optional: true},
  linkOrientationInfo: {type: String, optional: true},
  linkTourSignUp: {type: String, optional: true},
  linkVisitTips: {type: String, optional: true},
  mediaCongrats: {type: String, optional: true},
  mediaMascot: {type: String, optional: true},
  messagingServiceSid: {type: String, optional: true},
  name: {type: String},
  oliName: {type: String},
  passwordConstraints: {type: [Object], optional: true, defaultValue: []},
  phoneFinAid: {type: String, optional: true},
  prependCounselorResponse: {type: String, optional: true}, // prepends counselor response to emails e.g. Your officer replied to your question:
  promptFilter: {type: String, optional: true},
  studentFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  tuitionDueDate: {type: Date, optional: true}, // 8 -15
  voiceMail: {type: String, optional: true} //Message spoken (poorly) when the user calls the relevant phone number. The system uses a default message when this field is absent.
}));
