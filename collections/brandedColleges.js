BrandedColleges = new Mongo.Collection('brandedcolleges')
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, optional: true},
  abbr: {type: String, optional: true}, // GSU
  primaryBrandColor: {type: String, optional: true},
  aiSubject: {type: String},
  animal: {type: String, optional: true}, // Panther
  collection: {type: String, optional: true},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  counselors: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  createAndIntroDialog: {type: String, optional: true},
  csvTransformPipeline: {type: [String], optional: true, defaultValue: []},
  dateAccepted: {type: String, optional: true},
  dateScholarship: {type: String, optional: true},
  departments: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  dialogSettings: {type: new SimpleSchema({
    botOffDialog: {type: String, optional: true},
    botOffNoDialog: {type: Boolean, optional: true},
    finishedConversationDialog: {type: String, optional: true},
    knownNonContactedStudentDialog: {type: String, optional: true},
    unknownStudentDialogBotOn: {type: String, optional: true},
    unknownStudentDialogBotOff: {type: String, optional: true},
  }), optional: true},
  disabledFeatures: {type: [String], defaultValue: []},
  emailPrefix: {type: String, optional: true},
  facebookId: {type: String, optional: true},
  filterOn: {type: Boolean, optional: true},
  hashtag: {type: String, optional: true}, // include the hash
  infoGatheringBot: {type: String, optional: true}, //dialog that follows up on initial conversation in open bots
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
  messagingService: {type: String},
  messagingServiceSid: {type: String, optional: true},
  name: {type: String},
  oliName: {type: String},
  prependCounselorResponse: {type: String, optional: true}, // prepends counselor response to emails e.g. Your officer replied to your question:
  promptFilter: {type: String, optional: true},
  phoneFinAid: {type: String, optional: true},
  studentFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  tuitionDueDate: {type: Date, optional: true} // 8 -15
}));
