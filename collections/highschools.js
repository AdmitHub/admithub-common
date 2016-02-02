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
  atname: {
    type: [String],
    optional: true,
    unique: true,
    custom: function() {
      if (Meteor.isServer && this.isSet) {
        if (Colleges.findOne({
          atname: {
            $regex: "^"+this.value.trim()+"$",
            $options: "i"
          }
        })) {
          return "atnameTaken";
        }
      }
    }
  }
}));

Highschools.findFromAtname = function(atname) {
  if (!atname) {
    return null;
  }
  return Highschools.findOne({
    atname: {$regex: "^"+quoteRe(atname.trim()) + "$", $options: "i"}
  });
};
