CollegeEvents = new Mongo.Collection("collegeevents");

CollegeEvents.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  organizers: {
    type: [String], 
    regEx: SimpleSchema.RegEx.Id, 
    optional: true
  },
  subscribers: {
    type: [Object],
    optional: true
  },
  "subscribers.$.userId": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  "subscribers.$.collegeId": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
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
  },
  location: {
    type: String,
    optional: true
  },
  timezone: {
    type: String,
    optional: true
  },
  code: {
    type: String,
    optional: true,
    regEx: /\w+/
  },
  attendees: {
    type: [Object],
    optional: true
  },
  "attendees.$.userId": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  "attendees.$.createdAt": {
    type: Date,
    optional: true
  },
  "attendees.$.remindersSent": {
    type: Object,
    optional: true,
    blackbox: true
  }
}));
