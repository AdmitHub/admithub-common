CollegesInMemory = {};
if (Meteor.isServer) {
  Meteor.startup(function() {
    // Skip for certain apps
    if (Meteor.settings && Meteor.settings.app && Meteor.settings.app === 'phoenix') return
    Colleges.find({_distances: {$exists: true}}).forEach(function(college) {
      CollegesInMemory[college._id] = college;
    });
  });
}

