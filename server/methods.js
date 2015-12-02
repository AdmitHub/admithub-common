Meteor.methods({
  initiatePhoneConfirmation: function(userId) {
    Oli.initiate({userId: userId, transport: "twilio"});
  },
  findDreamCollegeId: function(userInputCollege) {
    // Implementation duplicated in oli/methods.js
    check(userInputCollege, String);
    var college = Colleges.findByName(userInputCollege)
    if (college && college.score > Colleges.FIND_BY_NAME_CUTOFF) {
      return college._id;
    }
  }
});
