RecentlyAsked = new Mongo.Collection('recentlyAsked');

var o = {optional: true};

RecentlyAsked.attachSchema({
  "question": fields.string(o),
  "answer": fields.string(o),
  "imageUrl": fields.string(o),
  "postId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
});