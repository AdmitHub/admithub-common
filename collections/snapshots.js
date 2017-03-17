Snapshots = new Mongo.Collection("snapshots");
Snapshots.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  workflow: {type: String, optional: true},
  body: {type: String, optional: true},
  createdAt: {type: Date},
  error: {type: String, optional: true},
  errorStack: {type: String, optional: true},
  smslogs: {type: String, optional: true},
  profile: {type: String, optional: true},
  mrq: {type: String, optional: true},
  url: {type: String, optional: true}
}));