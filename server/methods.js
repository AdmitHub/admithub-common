 Meteor.startup(function() {
  if(Meteor.isServer) {
    fuzzy = Npm.require("fuzzy");
  }
});

 Meteor.methods({
  findDreamCollegeId: function(userInputCollege) {
    check(userInputCollege, String);
    var colleges = CollegesInMemory;
    var collegeNameArray = [];
    var collegeNameHash = {}
    _.each(colleges, function(college) {
      collegeNameArray.push(college.name);
      collegeNameHash[college.name] = college._id;
    })
    var results = fuzzy.filter(userInputCollege, collegeNameArray);
    var matches = results.map(function(el) {return el.string});
    return collegeNameHash[matches[0]];
  }, 
 });
 