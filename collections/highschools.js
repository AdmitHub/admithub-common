Highschools = new Mongo.Collection("highschools");
Highschools.attachSchema(new SimpleSchema({
  // userId reference
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String, unique: true},
  incomingPhoneNumber: fields.phone_number({optional: true}),
  counselors: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {placeholder: "<user id>"},
    custom: SimpleSchema.validators.uniqueArray
  },
  students: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  hashtag: {
    type: String,
    unique: true,
    custom: function() {
      if (Meteor.isServer && this.isSet) {
        if (Colleges.findOne({
          hashtag: {
            $regex: "^"+this.value.trim()+"$",
            $options: "i"
          }
        })) {
          return "hashtagTaken";
        }
      }
    }
  }
}));

Highschools.findFromHashtag = function(hashtag) {
  if (!hashtag) {
    return null;
  }
  return Highschools.findOne({
    hashtag: {$regex: "^"+quoteRe(hashtag).trim()+"$", $options: "i"}
  });
};
Highschools.findFromAtname = function(atname) {
  if (!atname) {
    return null;
  }
  var hashtag = atname.replace(/^@/, "#");
  return Highschools.findOne({
    hashtag: {$regex: "^"+quoteRe(hashtag.trim()) + "$", $options: "i"}
  });
};
