BrandedCollegeApplicants = new Mongo.Collection('brandedcollegeapplicants')
BrandedCollegeApplicants.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  brandedCollegeId: {type: String},
  name: {type: new SimpleSchema({
    first: {type: String, optional: true},
    last: {type: String, optional: true}
  }), optional: true},
  zip: {type: String, optional: true}
}))
