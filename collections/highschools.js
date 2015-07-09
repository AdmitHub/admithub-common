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
    optional: true,
    autoform: {omit: true}
  }
});
