var zcta = {};
Meteor.startup(function() {
  if(Meteor.isServer) {
    zcta = Npm.require("us-zcta-counties");
  }
});

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
  "associatedEmails.$.mainFinAidContact": {type: Boolean, optional: true},
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


CollegeOfficers.getBestOfficerEmail = function(officers, zip, topic) {
  //if we were provided an email, verify that it's in our database. If it is, use it
  // if not, continue on and do the normal matching

  const trueZip = (zip && zip.length > 5) ? zip.slice(0, 5) : zip
  var data = zip ? zcta.getCountyByZip(trueZip) || {} : {};
  var state = data.state;
  var county = data.county;

  // return "damien@admithub.com";

  // 1. Construct a list of assns that match a topic, if given.
  // 2. Construct a list of assns that match by location: county first; if
  //    no assns are found, fall back to state.
  // 3. Try to find an assn that intersects topic and state.  If none found,
  //    drop the location constraint.
  // 4. If there is still nothing that matches, go for general contact.
  // 5. Otherwise undefined.

  const sets = [];
  // topic
  if (topic) {
    const topicMatch = _.filter(officers.associatedEmails, function (a) {
      return _.contains(a.topics, topic);
    });

    if (topicMatch.length) {
      sets.push(topicMatch);
    }
  }

  // location
  if (county && state) {
    const countyMatch = _.filter(officers.associatedEmails, function (a) {
      return !!_.findWhere(a.counties, {state: state, county: county});
    });

    if (countyMatch.length) {
      sets.push(countyMatch);
    } else {
      const stateMatch = _.filter(officers.associatedEmails, function (a) {
        return _.contains(a.states, state) && !_.findWhere(a.counties, {
          state: state
        });
      });
      if (stateMatch.length) {
        sets.push(stateMatch);
      }
    }
  }

  while (sets.length) {
    // Try to meet each of our criteria.
    const intersection = _.intersection.apply(_, sets);
    if (intersection.length) {
      return intersection[0].email;
    } else {
      // We can't meet them all; so drop the right-most criterion, and try again.
      sets.pop();
    }
  }
  // Nothing matched -- look for general.
  const general = _.find(officers.associatedEmails, function (a) {
    return a.general
  });

  if (general) {
    return general.email;
  }

  return undefined;
};