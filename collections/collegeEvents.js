CollegeEvents = new Mongo.Collection("collegeevents");

CollegeEvents.attachSchema(new SimpleSchema({
  // collegeID reference
  name: {
    type: String
  },
  location: {
    type: String,
    optional: true
  },
  start: {
    type: Date
  },
  stop: {
    type: Date
  },
  colleges: {
    type: [String]
  }
}));
