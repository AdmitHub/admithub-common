
Snapshots = new Mongo.Collection("snapshots");
Snapshots.attachSchema(new SimpleSchema({
   _id: {type: String, regEx: SimpleSchema.RegEx.Id},
  createdAt: {type: Date},
  brandedUserProfile: {type: String, optional: true},
  body: {type: String, optional: true},
  collegeProfile: {type: String, optional: true},
  error: {type: String, optional: true},
  errorStack: {type: String, optional: true},
  mrq: {type: String, optional: true},
  smslogs: {type: String, optional: true},
  url: {type: String, optional: true},
  user: {type: String, optional: true},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  workflow: {type: String, optional: true},
}));