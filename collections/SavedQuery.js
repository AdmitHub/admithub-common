/* eslint-disable no-undef */

SavedQuery = new Mongo.Collection('SavedQuery')

SavedQuery.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  // JSON.stringify of the query since $and and friends aren't allowed in
  // Objects
  query: {
    type: String,
  },
  userQuery: {
    type: String,
  },
  humanizedQuery: {
    type: String,
  },
  name: {
    type: String,
  },
  collegeId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: String,
  },
}));
