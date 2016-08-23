BrandedColleges = new Mongo.Collection("brandedcolleges");
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String},
  messagingService: {type: String},
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
  linkIntentToEnroll: {type: String, optional: true}, // bit.ly/gsu-intent
  linkAcceptAid: {type: String, optional: true}, // bit.ly/accept-aid
  linkFinAid: {type: String, optional: true}, // bit.ly/finaid-resources
  linkFafsa: {type: String, optional: true}, // bit.ly/gsu-fafsa
  linkOrientationInfo: {type: String, optional: true}, // bit.ly/1ZnYK6x
  linkOrientationChecklist: {type: String, optional: true}, //bit.ly/1O3UDMp
  linkTourSignUp: {type: String, optional: true}, // bit.ly/gsu-tours
  linkVisitTips: {type: String, optional: true}, // bit.ly/24yIgQ9
  phoneFinAid: {type: String, optional: true}, // 404-413-2600
}));
