CollegeEvents = new Mongo.Collection("collegeevents");

CollegeEvents.attachSchema(new SimpleSchema({
  // collegeID reference
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
