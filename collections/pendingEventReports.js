PendingEventReports = new Mongo.Collection("pendingeventreports");
PendingEventReports.attachSchema(new SimpleSchema({
  collegeId: {
    type: String
  },
  eventId: {
    type: String
  },
  createdAt: {
    type: Date
  }
}));