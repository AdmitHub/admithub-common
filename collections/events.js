Events = new Mongo.Collection("events");

Events.attachSchema(new SimpleSchema({
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
