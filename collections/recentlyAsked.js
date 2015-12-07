RecentlyAsked = new Mongo.Collection('recentlyAsked');

RecentlyAsked.attachSchema(new SimpleSchema({
  "question": {type: String, optional: true},
  "answer": {type: String, optional: true},
  "imageUrl": {type: String, optional: true},
  "postId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
}));
