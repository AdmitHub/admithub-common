CollegesInMemory = {}
if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Meteor.settings.noCollegeCache) return;
    Colleges.find({_distances: {$exists: true}}).forEach(function(college) {
      CollegesInMemory[college._id] = college;
    });
  });
}

