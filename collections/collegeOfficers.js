CollegeOfficers = new Mongo.Collection("collegeofficers");
CollegeOfficers.attachSchema(new SimpleSchema({
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
  }
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
