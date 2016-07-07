BrandedColleges = new Mongo.Collection("brandedcolleges");
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String},
  messagingService: {type: String},
  emailPrefix: {type: String, optional: true},
  oliName: {type: String},
  aiSubject: {type: String},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  facebookId: {type: Number, optional: true}
}));
