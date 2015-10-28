Meteor.users._ensureIndex({"profile.phone": 1, "phonePending": 1});
CollegeProfiles._ensureIndex({'userId': 1}, {unique: true});
CeebCodes._ensureIndex({"$**": "text"});
Posts._ensureIndex({"title": "text"});
Colleges._ensureIndex({"name": "text"});
if (Meteor.isDevelopment) {
  WorkflowTestCollection._ensureIndex({'userId': 1}, {unique: true});
}
