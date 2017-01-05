BrandedColleges = new Mongo.Collection("brandedcolleges");
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String},
  messagingService: {type: String},
  messagingServiceSid: {type: String, optional: true},
  abbr: {type: String, optional: true}, // GSU
  tuitionDueDate: {type: Date, optional: true}, //8 -15
  intentDeadline: {type: Date, optional: true}, // june 1
  collection: {type: String, optional: true},
  emailPrefix: {type: String, optional: true},
  oliName: {type: String},
  aiSubject: {type: String},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  facebookId: {type: Number, optional: true},
  animal: {type: String, optional: true}, // Panther
  linkIntentToEnroll: {type: String, optional: true},
  linkAcceptAid: {type: String, optional: true},
  linkFinAid: {type: String, optional: true},
  linkFafsa: {type: String, optional: true},
  linkOrientationInfo: {type: String, optional: true},
  linkOrientationChecklist: {type: String, optional: true},
  linkTourSignUp: {type: String, optional: true},
  linkVisitTips: {type: String, optional: true},
  phoneFinAid: {type: String, optional: true},
  filterOn: {type: Boolean, optional: true},
  filterLink: {type: String, optional: true},
  introKnownProspectBotPhoto: {type: String, optional: true, defaultValue: ""}
}));
