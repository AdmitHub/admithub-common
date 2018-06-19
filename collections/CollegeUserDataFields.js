/* eslint-disable no-undef */

CollegeUserDataFields = new Mongo.Collection('CollegeUserDataFields')

CollegeUserDataFields.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  collegeId: {
    type: String,
  },
  whitelist: {
    type: [String],
  },
  blacklist: {
    type: [String],
  }
}));
