BrandedColleges = new Mongo.Collection("brandedcolleges");
BrandedColleges.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String},
  messagingService: {type: String},
  oliName: {type: String},
  aiSubject: {type: String}
}));
