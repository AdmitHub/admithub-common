Highschools = new Mongo.Collection("highschools");
Highschools.attachSchema({
  // userId reference
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
});

Highschools.findFromHashtag = function(hashtag) {
  if (!hashtag) {
    return null;
  }
  return Highschools.findOne({hashtag: {$regex: "^"+hashtag.trim()+"$", $options: "i"}});
};