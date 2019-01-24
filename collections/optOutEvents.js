OptOutEvents = new Mongo.Collection('optOutEvents');
OptOutEvents.attachSchema(new SimpleSchema({
  type: {
    type: String,
    optional: false
  },
  student: {
    type: String,
    blackbox: true,
    optional: false
  },
  date: {
    type: Date,
    optional: false
  }
}));
