Meteor.startup(function () {
  Meteor.users._ensureIndex({'profile.phone': 1, 'phonePending': 1})
  CollegeProfiles._ensureIndex({'userId': 1}, {unique: true})
  CeebCodes._ensureIndex({'$**': 'text'})
  Colleges._ensureIndex({'name': 'text'})
  TelescopePosts.getCollection()._ensureIndex({'title': 'text'})
  if (Meteor.isDevelopment && typeof WorkflowTestCollection !== 'undefined') {
    WorkflowTestCollection._ensureIndex({'userId': 1}, {unique: true})
  }
})
