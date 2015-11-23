CollegeEvents = new Mongo.Collection("collegeevents");

CollegeEvents.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {
    type: String
  },
  start: {
    type: Date,
    autoform: {type: "datetime"}
  },
  stop: {
    type: Date,
    autoform: {type: "datetime"}
  }
}));
