Events = new Mongo.Collection("events");

ParticipantSchema = new SimpleSchema({
  phone: {
    type: String
  },
  message: {
    type: String,
    optional: true
  },
  recommendationLikelihood: {
    type: Number,
    optional: true
  }
});

Events.attachSchema(new SimpleSchema({
  // collegeID reference
  name: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  participants: {
    type: [ParticipantSchema]
  }
}));