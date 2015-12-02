VerifiedCollegeEmails = new Mongo.Collection("verifiedCollegeEmails");
VerifiedCollegeEmails.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  collegeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String
  }
}));