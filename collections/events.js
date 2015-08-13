Events = new Mongo.Collection("events");

Events.attachSchema(new SimpleSchema({
  // collegeID reference
  name: {
    type: String
  },
  location: {
    type: String
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