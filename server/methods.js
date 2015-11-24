Meteor.methods({
  initiatePhoneConfirmation: function(userId) {
    Oli.initiate({userId: userId, transport: "twilio"});
  },
  findDreamCollegeId: function(userInputCollege) {
    check(userInputCollege, String);
    var fuzzy = Meteor.npmRequire("fuzzy");
    var collegeNameArray = [];
    var collegeNameHash = {}
    _.each(CollegesInMemory, function(college) {
      collegeNameArray.push(college.name);
      collegeNameHash[college.name] = college._id;
    })
    var results = fuzzy.filter(userInputCollege, collegeNameArray);
    if (results[0] && results[0].string) {
      return collegeNameHash[results[0].string];
    }
  }
});
