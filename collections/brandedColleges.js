BrandedColleges = new Mongo.Collection('brandedcolleges')
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, optional: true},
  abbr: {type: String, optional: true}, // GSU
  primaryBrandColor: {type: String, optional: true},
  aiSubject: {type: String},
  animal: {type: String, optional: true}, // Panther
  collection: {type: String, optional: true},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  dateAccepted: {type: String, optional: true},
  dateScholarship: {type: String, optional: true},
  emailPrefix: {type: String, optional: true},
  facebookId: {type: Number, optional: true},
  filterOn: {type: Boolean, optional: true},
  hashtag: {type: String, optional: true}, // include the hash
  intentDeadline: {type: Date, optional: true}, // june 1
  introKnownProspectBotPhoto: {type: String, optional: true, defaultValue: ''},
  linkAcceptAid: {type: String, optional: true},
  linkAdmit: {type: String, optional: true},
  linkCounselors: {type: String, optional: true},
  counselors: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  departments: {type: [Object], blackbox: true, optional: true, defaultValue: []},
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
  promptFilter: {type: String, optional: true},
  phoneFinAid: {type: String, optional: true},
  tuitionDueDate: {type: Date, optional: true}, // 8 -15
  disabledFeatures: {type: [String], defaultValue: []},
  dialogSettings: {type: new SimpleSchema({
    unknownStudentDialogBotOn: {type: String, optional: true},
    unknownStudentDialogBotOff: {type: String, optional: true},
    knownNonContactedStudentDialog: {type: String, optional: true},
    currentUserDialog: {type: String, optional: true},
    botOffDialog: {type: String, optional: true},
    botOffNoDialog: {type: Boolean, optional: true},
    finishedConversationDialog: {type: String, optional: true}
  }), optional: true},
  studentFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  internalFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  csvTransformPipeline: {type: [String], optional: true, defaultValue: []},
  createAndIntroDialog: {type: String, optional: true},
  prependCounselorResponse: {type: String, optional: true} // prepends counselor response to emails e.g. Your officer replied to your question:
}));
