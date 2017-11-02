Heartbeats = new Mongo.Collection('heartbeats')
Heartbeats.attachSchema(new SimpleSchema({
  date: {type: Date},
  intendedAt: {type: Date},
  host: {type: String}
}))
