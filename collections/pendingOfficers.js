PendingOfficers = new Mongo.Collection("pendingOfficers");
PendingOfficers.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  token: {
    type: String
  },
  collegeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  verifiedAt: {
    type: Date,
    optional: true
  }
}));
