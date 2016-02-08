BrandedCollegeApplicants = new Mongo.Collection("brandedcollegeapplicants");
BrandedCollegeApplicants.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  brandedCollegeId: {type: String, regEx: SimpleSchema.RegEx.Id},
  middleName: {type: String, optional: true},
  zip: {type: String, optional: true}
}));
