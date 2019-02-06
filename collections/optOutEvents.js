OptOutEvents = new Mongo.Collection('optOutEvents');
OptOutEvents.attachSchema(new SimpleSchema({
  _id: {type: String, optional: true},
  type: {
    type: String,
    optional: false
  },
  student: {
    type: Object,
    blackbox: true,
    optional: false
  },
  date: {
    type: Date,
    optional: false
  },
  collegeId: {
    type: String,
    optional: false
  }
}));
