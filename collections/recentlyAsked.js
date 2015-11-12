RecentlyAsked = new Mongo.Collection('recentlyAsked');

var o = {optional: true};

RecentlyAsked.attachSchema({
  "question": {type: String, optional: true},
  "answer": {type: String, optional: true},
  "imageUrl": {type: String, optional: true},
  "postId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
});