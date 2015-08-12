Events = new Mongo.Collection("events");

ParticipantSchema = new SimpleSchema({
  collegeId: {
    type: String
  }
});

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
  participants: {
    type: [ParticipantSchema]
  }
}));