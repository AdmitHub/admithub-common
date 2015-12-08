UnverifiedEmailMessages = new Mongo.Collection("unverifiedEmailMessages");
UnverifiedEmailMessages.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  matchId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  collegeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  verifiedAt: {
    type: Date,
    optional: true
  }
}));