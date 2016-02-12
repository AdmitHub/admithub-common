CollegeOfficers = new Mongo.Collection("collegeofficers");
CollegeOfficers.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  // collegeID reference
  collegeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id, unique: true,
    autoform: { placeholder: "college _id" }
  },
  // userId references
  officers: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id, optional: true,
    autoform: { placeholder: "user _id" },
    custom: SimpleSchema.validators.uniqueArray
  },
  pendingOfficers: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id, optional: true,
    autoform: { placeholder: "user _id" },
    custom: SimpleSchema.validators.uniqueArray
  },
  associatedEmails: {
    type: [Object],
    optional: true
  },
  "associatedEmails.$.email": {type: String, optional: true},
  "associatedEmails.$.name": {type: String, optional: true},
  "associatedEmails.$.general": {type: Boolean, optional: true},
  "associatedEmails.$.topics": {type: [String], optional: true},
  "associatedEmails.$.counties": {type: [Object], optional: true},
  "associatedEmails.$.counties.$.state": fields.state({optional: true}),
  "associatedEmails.$.counties.$.county": {type: String, optional: true},
  "associatedEmails.$.states": fields.state({optional: true, type: [String]}),
  blacklistedEmails: {
    type: [String],
    optional: true
  },
  introExclamation: {type: String, optional: true}
}));

//
// Denormalize college partner status
//
var _setCollegePartnerStatus = function(doc, set) {
  Colleges.update({_id: doc.collegeId}, {$set: {partner: set}});
};
CollegeOfficers.after.insert(function(userId, doc) {
  _setCollegePartnerStatus(doc, true);
});
CollegeOfficers.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (this.previous.collegeId !== doc.collegeId) {
    _setCollegePartnerStatus(this.previous, false);
    _setCollegePartnerStatus(doc, true);
  }
}, {fetchPrevious: true});
CollegeOfficers.after.remove(function(userId, doc) {
  _setCollegePartnerStatus(doc, false);
});
