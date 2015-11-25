CollegesInMemory = {};
if (Meteor.isServer) {
  Meteor.startup(function() {
    Colleges.find({_distances: {$exists: true}}).forEach(function(college) {
      CollegesInMemory[college._id] = college;
    });
  });
}

