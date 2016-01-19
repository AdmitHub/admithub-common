// On user profile:
//  - phone number
//  - email
var zipcodes = {};
Meteor.startup(function() {
  if(Meteor.isServer) {
    zipcodes = Npm.require("zipcodes");
  }
});
var o = {optional: true};

var _demographicsSchema = new SimpleSchema({
  "gender": fields.gender(o),
  "race": fields.race(o),
  "citizenship": fields.string(o),
  "nativeLanguage": fields.string(o),
  "yearsOutsideUs": fields.number(o),
  "religion": fields.string(o),
  "firstGen": fields.bool(o),
  "freshmanApplicant": fields.bool(o),
  "transfer": fields.bool(o),
  "mostRecentCollege": fields.string(o),
  "emoji": fields.string(o),
  "dateOfBirth": fields.date(o),
  "dobConfirmed": fields.bool(o)
});

var _locationSchema = new SimpleSchema({
  "address": fields.address(o),
  "city": fields.string(o),
  "state": fields.state(o),
  "zip": fields.zip_code(_.extend(o))
});

var _gpa = new SimpleSchema({
  "gpa": fields.number({decimal: true, optional: true}),
  "range": fields.number({decimal: true, optional: true}),
  "normalizedGPA": fields.number({
    decimal: true,
    min: 0,
    max: 4,
    optional: true,
  }),
  "gpaWeighting": fields.gpa_weighting(o)
});

var _transcriptSchema = new SimpleSchema({
  "photos": fields.url({type: [String], optional: true})
  // add other transcript fields?
});

var _oneHighSchool = new SimpleSchema({
  "name": {type: String, optional: true},
  "type": fields.high_school_type(o),
  "location": {type: _locationSchema, optional: true},
  "url": fields.url(o),
  "gpa": {type: _gpa, optional: true},
  "classRank": fields.number({min: 1, optional: true}),
  "classRankType": fields.class_rank_type(o),
  "classRankRange": fields.class_rank_description(o),
  "transcript": {type: _transcriptSchema, optional: true},
  "ceeb": fields.string(o)
});

var _highschoolSchema = new SimpleSchema({
  "gpaGeneral": {type: _gpa, optional: true}, // non-school-specific reported gpa
  "classRankGeneral": fields.class_rank_description(o),
  "expectedGraduationYear": fields.expected_graduation_year(o),
  "guidanceCounselor": {type: new SimpleSchema({
    "name": fields.name_part(o),
    "email": fields.email(o),
    "contactPreference": fields.bool(o)
  }), optional: true},
  "current": {type: _oneHighSchool, optional: true},
  "past": {type: [_oneHighSchool], optional: true}
});

var _currentCollegeSchema = new SimpleSchema({
  "name": {type: String, optional: true}
});

var _subjectBooleans = new SimpleSchema({
  "math": fields.bool(o),
  "science": fields.bool(o),
  "english": fields.bool(o),
  "historySocialStudies": fields.bool(o),
  "foreignLanguages": fields.bool(o),
  "other": fields.bool(o),
});

var _courseSchema = new SimpleSchema({
  "detailedCourses": {type: [new SimpleSchema({
    "year": fields.high_school_year(o),
    "semseter": fields.high_school_semester(o),
    "level": fields.high_school_level(o),
    "subject": fields.string(o),
    "grade": fields.high_school_grade(o)
  })], optional: true},

  "bestSubject": {type: _subjectBooleans, optional: true},
  "favoriteSubject": {type: _subjectBooleans, optional: true},
});

var _parentSchema = new SimpleSchema({
  "maritalStatus": fields.parent_marital_status(o),
  "permanentHomeParent": fields.permanent_home_parent(o),
  "numberOfChildren": fields.number(o),
  "parents": {type: [new SimpleSchema({
    "name": fields.name_part(o),
    "phone": fields.phone_number(o),
    "email": fields.email(o),
    "relationship": fields.parent_role(o),
    "occupation": fields.string(o),
    "company": fields.string(o),
    "colleges": {type: [String], optional: true},
    "degree": fields.string(o),
    "canContact": fields.bool(o)
  })]}
});

var _siblingSchema = new SimpleSchema({
  "name": fields.name_part(o),
  "relationship": fields.sibling_relationship(o),
  "college": {type: String, optional: true}
});

var _standardizedTestSchema = new SimpleSchema({
  "sat": {type: new SimpleSchema({
    "composite": fields.sat_composite_score(o),
    "tests": {type: [new SimpleSchema({
      "date": fields.date(o),
      "math": fields.sat_score(o),
      "reading": fields.sat_score(o),
      "writing": fields.sat_score(o),
      "essay": fields.sat_essay_score(o)
    })], optional: true}
  }), optional: true},
  "act": {type: new SimpleSchema({
    "composite": fields.act_composite_score(o),
    "tests": {type: [new SimpleSchema({
      "date": fields.date(o),
      "english": fields.act_score(o),
      "math": fields.act_score(o),
      "reading": fields.act_score(o),
      "science": fields.act_score(o),
      "essay": fields.act_essay_score(o),
    })], optional: true}
  }), optional: true},
  "psat": {type: new SimpleSchema({
    "composite": fields.psat_composite_score(o)
  }), optional: true},
  "other": {type: new SimpleSchema({
    "tests": {type: [new SimpleSchema({
      "date": fields.date(o),
      "name": fields.string(o),
      "score": fields.string(o)
    })], optional: true}
  }), optional: true},
});

var _honorSchema = new SimpleSchema({
  "awardTypes": {type: new SimpleSchema({
    "local": fields.bool(o),
    "regional": fields.bool(o),
    "national": fields.bool(o),
    "international": fields.bool(o)
  }), optional: true},
  "detailedHonors": {type: [new SimpleSchema({
    "honor": fields.string(o),
    "awarder": fields.string(o),
    "date": fields.date(o),
    "grade": fields.high_school_year(o),
    "levelOfRecognition": fields.honor_level_of_recognition(o),
    "description": fields.string({max: 160, optional: true})
  })], optional: true}
});

var _activitySchema = new SimpleSchema({
  "activityTypes": {type: new SimpleSchema({
    "art": fields.bool(o),
    "music": fields.bool(o),
    "communityService": fields.bool(o),
    "theater": fields.bool(o),
    "academicClubs": fields.bool(o),
    "newspaper": fields.bool(o),
    "sports": fields.bool(o),
    "studentGovernment": fields.bool(o),
    "job": fields.bool(o),
    "other": fields.bool(o),
  }), optional: true},
  "detailedActivities": {type: [new SimpleSchema({
    "activity": fields.string({max: 160, optional: true}),
    "role": fields.string({max: 160, optional: true}),
    "startDate": fields.date(o),
    "endDate": fields.date(o),
    "years": {type: new SimpleSchema({
      "freshman": fields.bool(o),
      "sophomore": fields.bool(o),
      "junior": fields.bool(o),
      "senior": fields.bool(o),
      "continue": fields.bool(o)
    }), optional: true},
    "hoursPerWeek": fields.number({max: 168, optional: true}),
    "weeksPerYear": fields.number({max: 52, optional: true}),
    "intentToPursue": fields.bool(o),
    "description": fields.string({max: 300, optional: true}),
    "achievement": fields.string({max: 160, optional: true}),
    "type": fields.activity_type({optional: true}),
  })], optional: true}
});

var _volunteerSchema = new SimpleSchema({
  "detailedVolunteer": {type: [new SimpleSchema({
    "organization": fields.string({max: 160, optional: true}),
    "position": fields.string({max: 160, optional: true}),
    "startDate": fields.date(o),
    "endDate": fields.date(o),
    "summary": fields.string({max: 300, optional: true}),
    "highlights": {type: [fields.string({max: 160})], optional: true}
  })]}
});

var _skillSchema = new SimpleSchema({
  "name": fields.string({max: 160, optional: true}),
  "level": fields.skill_level(o)
});

var _languageSchema = new SimpleSchema({
  "language": fields.string({max: 30, optional: true}),
  "level": fields.language_level(o)
});

var _essaySchema = new SimpleSchema({
  "personalEssay": fields.essay(o),
  "additionalInformation": fields.essay(o),
  "driveFolderId": {type: String, optional: true, autoform: {type: "hidden"}},
  "essaysLastModified": {type: Date, optional: true, autoform: {type: "hidden"}},
  "personalTraits": {
    type: new SimpleSchema({
      "when": {type: String, optional: true},
      "where": {type: String, optional: true},
      "story": {type: [{type: String, optional: true}],optional: true}
    }),
    optional: true
  },
  "idealDay": {
    type: new SimpleSchema({
      "start": fields.string({allowedValues: [
        "Relax and sleep in",
        "Get up early and seize the day"
      ], optional: true}),
      "activities": {
        type: [new SimpleSchema({
          "activity": {type: String, optional: true},
          "why": {type: String, optional: true}
        })],
        optional: true
      }
    }),
    optional: true
  },
  "advice": {
    type: new SimpleSchema({
      "rather": fields.string({allowedValues: [
        "Give good advice",
        "Get good advice",
      ], optional: true}),
      "why": {type: String, optional: true},
      "story": {type: [{type: String, optional: true}],optional: true}
    }),
    optional: true
  },
  "loseOrTry": {
    type: new SimpleSchema({
      "rather": fields.string({allowedValues: [
        "Always lose",
        "Never try",
      ], optional: true}),
      "why": {type: String, optional: true},
      "story": {type: [{type: String, optional: true}],optional: true}
    }),
    optional: true
  },
  "roommates": {
    type: new SimpleSchema({
      "info": {
        type: [new SimpleSchema({
          "important": {type: String, optional: true},
          "why": {type: String, optional: true},
        })],optional: true
      },
      "questions": {
        type: [new SimpleSchema({
          "prompt": {type: String, optional: true},
          "reprompt": {type: String, optional: true},
          "why": {type: String, optional: true},
        })],
        optional: true
      }
    }),
    optional: true
  },
  "misc": {
    type: new SimpleSchema({
      "emoji": {type: String, optional: true},
      "activities": {type: [new SimpleSchema({
          "why": {type: String, optional: true},
          "activity": {type: String, optional: true},
          "story": {type: [{type: String, optional: true}],optional: true}
        })],
        optional: true
      }
    }),
    optional: true
  },
  "failure": {
    type: new SimpleSchema({
      "failure": {type: String, optional: true},
      "howOld": {type: String, optional: true},
      "timeOfLife": {type: String, optional: true},
      "learned": {type: String, optional: true}
    }),
    optional: true
  },
  "challengedBelief": {
    type: new SimpleSchema({
      "belief": {type: String, optional: true},
      "why": {type: String, optional: true},
      "difficultDecision": {type: Boolean, optional: true},
      "difficultReasoning": {type: String, optional: true},
      "story": {type: [{type: String, optional: true}],optional: true}
    }),
    optional: true
  },
  "problemSolved": {
    type: new SimpleSchema({
      "failed": {type: String, optional: true},
      "knowNow": {type: String, optional: true},
      "doneDifferently": {type: String, optional: true},
      "solved": {type: String, optional: true},
      "approach": {type: String, optional: true},
      "outcome": {type: String, optional: true}
    }),
    optional: true
  },
  "accomplishment": {
    type: new SimpleSchema({
      "accomplishment": {type: String, optional: true},
      "more": {type: String, optional: true},
      "workHard": {type: Boolean, optional: true},
      "workStory": {type: String, optional: true},
      "comesEasy": {type: Boolean, optional: true}
    }),
    optional: true
  }
});

var _recommendationSchema = new SimpleSchema({
  "friendsAdjectives": fields.string({max: 300, optional: true}),
  "recommenders": {type: [new SimpleSchema({
    "name": fields.name_part(o),
    "role": fields.recommender_role(o),
    "subjects": fields.string(o),
    "grades": {type: new SimpleSchema({
      "freshman": fields.bool(o),
      "sophomore": fields.bool(o),
      "junior": fields.bool(o),
      "senior": fields.bool(o)
    }), optional: true},
    "favoriteAcademicLesson": fields.string(o),
    "fondestPersonalMemory": fields.string(o)
  })], optional: true}
});

var _preferenceSchema = new SimpleSchema({
  "dreamCollege": {type: new SimpleSchema({
    "name": fields.string({max: 140, optional: true}),
    "reason": fields.string({max: 300, optional: true}),
    "dreamCollegeId": fields.string({max: 140, optional: true}),
  }), optional: true},

  "schoolTypes": {type: new SimpleSchema({
    "public": fields.bool(o),
    "private": fields.bool(o),
    "ethnicallyDiverse": fields.bool(o),
    "majorSportsProgram": fields.bool(o),
    "ethnicallySimilar": fields.bool(o),
    "researchUniversity": fields.bool(o),
    "historicallyBlack": fields.bool(o),
    "religious": fields.bool(o),
    "military": fields.bool(o),
    "liberalArts": fields.bool(o),
    "vocational": fields.bool(o),
    "singleSex": fields.bool(o),
  }), optional: true},

  "weather": {type: new SimpleSchema({
    "flipFlops": fields.bool({label: "Warm", optional: true}),
    "allSeasons": fields.bool({label: "Mild", optional: true}),
    "frozenTundra": fields.bool({label: "All Seasons", optional: true}),
  }), optional: true},

  "size": {type: new SimpleSchema({
    "small": fields.bool(o),
    "medium": fields.bool(o),
    "large": fields.bool(o)
  }), optional: true},

  "city": {type: new SimpleSchema({
    "big": fields.bool(o),
    "medium": fields.bool(o),
    "small": fields.bool(o),
    "sticks": fields.bool({label: "Tiny", optional: true}),
    "irrelevant": fields.bool(o)
  }), optional: true},

  "region": {type: new SimpleSchema({
    "northeast": fields.bool(o),
    "midwest": fields.bool(o),
    "south": fields.bool(o),
    "west": fields.bool(o),
    "any": fields.bool(o)
  }), optional: true},

  "food": {type: new SimpleSchema({
    "shitty": fields.bool({label: "Don't Care", optional: true}),
    "good": fields.bool(o),
    "gourmet": fields.bool(o)
  }), optional: true},

  "fraternities": {type: new SimpleSchema({
    "hate": fields.bool(o),
    "whatever": fields.bool(o),
    "love": fields.bool(o)
  }), optional: true},

  "nightLife": {type: new SimpleSchema({
    "dorm": fields.bool({label: "Chill", optional: true}),
    "bigGame": fields.bool(o),
    "party": fields.bool(o),
    "show": fields.bool({label: "Concert", optional: true})
  }), optional: true},

  "car": fields.bool(o),
  "closeToHome": fields.yes_no_whatever(o), // within 50 miles
  "sameState": fields.yes_no_whatever(o),

  "plannedColleges": {type: [new SimpleSchema({
    name: fields.string(o)
  })], optional: true},

  "somethingInteresting": fields.string(o),

  "likes": {type: [String], regEx: SimpleSchema.RegEx.Id, optional: true}, // college ID
  "dislikes": {type: [String], regEx: SimpleSchema.RegEx.Id, optional: true}, // college ID
});

var _intentionSchema = new SimpleSchema({
  "financialAid": fields.bool(o), // need-based financial aid intent
  "intendToStudy": fields.string({max: 140, optional: true}),
  "athleticRecruit": fields.bool(o),
  "athleticRecruitLevel": fields.athletic_divisions(o)
});

var _metaFields = new SimpleSchema({
  "initialSurvey": {type: new SimpleSchema({
    "crushedThat": fields.bool(o),
    "finished": fields.bool(o),
    "evaluation": fields.string({allowedValues: ["Great", "Pretty good", "Meh", "Lame", "Beyond awful"], optional: true}),
    "evaluationRecommend": fields.string({max: 140, optional: true}),
    "podcastGuest": fields.bool(o),
    "utm_medium": fields.string(o),
    "skip": fields.bool(o),
  }), optional: true},
  "inquiryCardBot": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "collegePreferencesBot": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "match": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "matchSupplemental": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "resumeBot": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "essayBot": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "questionBot": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true}

});
CollegeProfileSchema = new SimpleSchema({
  "_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  // the only non-optional field
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "firstName": fields.name_part({
    optional: true
  }),
  "lastName": fields.name_part({
    optional: true
  }),
  "middleInitial": {type: String, max: 1, optional: true},
  "name": fields.name_part({
    optional: true
  }),
  "headline": {type: String, max: 300, optional: true},
  "location": {type: _locationSchema, optional: true},
  "demographics": {type: _demographicsSchema, optional: true},
  "parents": {type: _parentSchema, optional: true},
  "siblings": {type: _siblingSchema, optional: true},
  "highschool": {type: _highschoolSchema, optional: true},
  "currentCollege": {type: _currentCollegeSchema, optional: true},
  "courses": {type: _courseSchema, optional: true},
  "tests": {type: _standardizedTestSchema, optional: true},
  "honors": {type: _honorSchema, optional: true},
  "activities": {type: _activitySchema, optional: true},
  "skillsOrInterests": {type: [_skillSchema], optional: true},
  "languages": {type: [_languageSchema], optional: true},
  "volunteer": {type: _volunteerSchema, optional: true},
  "essays": {type: _essaySchema, optional: true},
  "feelingAboutApplication": fields.feeling_about_application(o),
  "whyYouStressed": {type: String, max: 500, optional: true},
  "intentions": {type: _intentionSchema, optional: true},
  "recommendations": {type: _recommendationSchema, optional: true},
  "preferences": {type: _preferenceSchema, optional: true},

  "meta": {type: _metaFields, optional: true},

  "modified": {type: Date, autoValue: function() { return new Date(); }},
  "created": fields.date(),
  "contactable": fields.bool({optional: true}),
  "contactableConfirmed": fields.bool({optional: true}),
  "stopReason": fields.string({optional: true}),
  "referralSource": fields.referral_source({optional: true}),

  "description": fields.description({optional: true}),
  "earlyStarter": fields.bool(o)
});

CollegeProfiles = new Mongo.Collection("collegeprofiles");
CollegeProfiles.attachSchema(CollegeProfileSchema);

CollegeProfiles.before.update(function(userId, doc, fieldNames, mod, options) {
  if (Meteor.isServer) {
    var $set = mod.$set || {};
    // $set could look like either of the following depending on the environment:
    //  1. {"location.zip": "59715"}
    //  2. {"location": {"zip": "59715"}}
    //  Flatten before lookups to put it into a consistent form 1.
    var flat = dot.flatten($set);
    var zip = flat["location.zip"];
    if (zip) {
      var zipcodeLookup = zipcodes.lookup(zip);

      if (zipcodeLookup !== undefined) {
        mod.$set.location = {
          city: zipcodeLookup.city,
          state: zipcodeLookup.state,
          zip: zipcodeLookup.zip,
          address: flat["location.address"] || doc.address
        };
        // Remove "location.zip" if it exists so we don't try to set both
        // dot-notation-style and full-object style at the same time.
        delete mod.$set["location.zip"];
        delete mod.$set["location.address"];
        delete mod.$set["location.city"];
        delete mod.$set["location.state"];
      }
    }
  }
});

CollegeProfiles.before.update(function(userId, doc, fieldNames, modifier, options) {
  // Might be cleaner to implement this as an autoValue function, but as of
  // 2015-04-23, we get a mongo error ("cannot $set both "highschool" and
  // "highschool.gpaGeneral.normalizedGPA") if we do so.
  var $set = modifier.$set || {};
  var flat = dot.flatten($set);
  var gpa = flat["highschool.gpaGeneral.gpa"];
  var range = flat["highschool.gpaGeneral.range"];
  if (gpa) {
    if (!range && gpa <= 4.0) {
      // assume a range of 4.0 if plausible
      range = 4.0;
    }
    if (range) {
      var normalized = (Math.min(gpa, range) / range) * 4.0;
      if ($set.highschool && $set.highschool.gpaGeneral) {
        modifier.$set.highschool.gpaGeneral.normalizedGPA = normalized;
      }
      else if ($set.highschool) {
        modifier.$set.highschool["gpaGeneral.normalizedGPA"] = normalized;
      }
      else {
        modifier.$set["highschool.gpaGeneral.normalizedGPA"] = normalized;
      }
    }
  }
});

CollegeProfiles.before.update(function(userId, doc, fieldNames, modifier, options) {
  function currentValue(field) {
    return dotGet(modifier, "$unset."+field) != undefined ?
           "" :
           dotGet(modifier, "$set."+field) || doc[field] || "";
  }

  var firstName = currentValue("firstName");
  var lastName = currentValue("lastName");
  var name = currentValue("name");

  var newName = (firstName + " " + lastName).trim() || "Anonymous";
  if (name != newName) {
    modifier.$set = modifier.$set || {};
    modifier.$set.name = newName;

    // On oli, this is fire and forget.
    Meteor.users.update(doc.userId, {
      $set: {
        "profile.name": newName
      }
    });

    if (dotGet(modifier, "$unset.name") != undefined) {
      delete modifier.$unset.name;
      if (!Object.keys(modifier.$unset).length) {
        delete modifier.$unset;
      }
    }
  }
});

CollegeProfiles.before.update(function(userId, doc, fieldNames, modifier, options) {
  // flatten $set and $unset so that we can key into them in a consistent
  // fashion, even if they're doing $set: {preferences: {dreamCollege: ...}
  var set = modifier.$set || {};
  var unset = modifier.$unset || {};
  var flatSet = dotFlatten(set);
  var flatUnset = dotFlatten(unset);

  // Note that userId refers to the executing user, which may not be the same
  // as the profile's user (e.g. admin updating the doc).
  var profileUserId = doc.userId;
  var newDreamCollegeName = flatSet["preferences.dreamCollege.name"];

  var isUnsetting = flatUnset.hasOwnProperty("preferences.dreamCollege.name") || (
    newDreamCollegeName === "" || newDreamCollegeName === null
  );

  var isSetting = !!flatSet["preferences.dreamCollege.name"] && (
    flatSet["preferences.dreamCollege.name"] !== dot.get(doc, "preferences.dreamCollege.name")
  );

  // Unset dream college ID if we're unsetting the name.
  if (isUnsetting) {
    modifier.$unset = modifier.$unset || {};
    modifier.$unset["preferences.dreamCollege.dreamCollegeId"] = "";
    // Note: we do not remove the "bot match" or likes when unsetting dream
    // college id.
  }

  // Set happens only on the server, so we can synchronously update the
  // modifier after fuzzy matching the name. The update will propagate back to
  // the client after it finishes on the server.
  if (isSetting && Meteor.isServer) {
    modifier.$set = modifier.$set || {};

    // WARNING: if you change the logic to either the vanilla node or meteor
    // variants here, be sure to change the other and test in both oli and
    // college-chooser!
    if (Meteor.isVanillaNode) {
      // Run async with promise.
      return Meteor.call(
        "findDreamCollegeId", newDreamCollegeName
      ).then(function(id) {
        if (id) {
          modifier.$set["preferences.dreamCollege.dreamCollegeId"] = id;
          return Meteor.call('createMatchRecordEncounterIntroMessage', {
            userId: profileUserId,
            collegeId: id,
            source: "Dream college"
          });
        } else {
          modifier.$unset = modifier.$unset || {};
          modifier.$unset["preferences.dreamCollege.dreamCollegeId"] = "";
        }
      });
    } else {
      // Run sync in fiber.
      var id = Meteor.call("findDreamCollegeId", newDreamCollegeName);
      if (id) {
        modifier.$set["preferences.dreamCollege.dreamCollegeId"] = id;
        Meteor.call("createMatchRecordEncounterIntroMessage", {
          userId: profileUserId,
          collegeId: id,
          source: "Dream college"
        });
      } else {
        modifier.$unset = modifier.$unset || {};
        modifier.$unset["preferences.dreamCollege.dreamCollegeId"] = "";
      }
    }
  }
});

CollegeProfiles.countAnsweredQuestions = function(collegeProfile) {
  var clone = _.clone(collegeProfile);
  ["_id", "college", "userId", "created", "modified", "contactable",
    "match", "preferences.likes", "preferences.dislikes"].forEach(function(key) {
    dotClear(clone, key);
  });
  var total = 0;
  function countAnswers(obj) {
    if (_.isFunction(obj) || _.isRegExp(obj)) {
      return;
    } else if (_.isDate(obj)) {
      total += 1;
    } else if (_.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        countAnswers(obj[i]);
      }
    } else if (_.isObject(obj)) {
      // count multiple booleans as 1.
      if (_.all(_.values(obj), _.isBoolean)) {
        total += 1;
      } else {
        for (var key in obj) {
          countAnswers(obj[key]);
        }
      }
    } else {
      total += 1;
    }
  }
  countAnswers(clone);
  return total;
}

var getFirstContact = function(match) {
  var source = dotGet(match, "encounters.0.source");
  var eventId = dotGet(match, "encounters.0.eventId");
  if (eventId) {
    var event = CollegeEvents.findOne(eventId);
    if (event) {
      return event.name;
    }
  } else {
    return source;
  }
};

CollegeProfiles.getUserData = function(user, profile, match) {
  var created = dotGet(match, "created") || dotGet(profile, "created");
  created = moment(created).format("MMM Do YYYY, h:mm A");
  return {
    "Created At": "\""+created+"\"",
    "First Contact": getFirstContact(match),
    "Email Address": dotGet(user, "emails.0.address") || "",
    "Date of Birth": dotGet(profile, "demographics.dateOfBirth") ? moment(dotGet(profile, "demographics.dateOfBirth")).format('M-D-YYYY') : "",
    "First Name": dotGet(profile, "firstName") || "",
    "Last Name": dotGet(profile, "lastName") || "",
    "Description": dotGet(profile, "description") || "",
    "Zip Code": dotGet(profile, "location.zip") ? dotGet(profile, "location.zip") : "",
    "City": dotGet(profile, "location.city") || "",
    "State": dotGet(profile, "location.state") || "",
    "Street Address": dotGet(profile, "location.address") || "",
    "High School": dotGet(profile, "highschool.current.name") || "",
    "CEEB Code": dotGet(profile, "highschool.current.ceeb") || "",
    "Expected Year of Graduation": dotGet(profile, "highschool.expectedGraduationYear") || "",
    "GPA": dotGet(profile, "highschool.gpaGeneral.gpa") || "",
    "SAT": dotGet(profile, "tests.sat.composite") || "",
    "ACT": dotGet(profile, "tests.act.composite") || "",
    "Intended Major": dotGet(profile, "intentions.intendToStudy") || "",
    "College Transfer": dotGet(profile, "demographics.transfer") ? "Yes" : "No",
    "Most Recent College": dotGet(profile, "demographics.mostRecentCollege") || "",
    "Contactable": dotGet(profile, "contactable") || "",
    "Has Visited": dotGet(match, "hasVisited") ? "Yes" : "No",
    "Wants to Visit": dotGet(match, "wantsToVisit") ? "Yes" : "No",
    "Legacy": dotGet(match, "legacy") ? "Yes" : "No",
    "Considering Early Apply": dotGet(match, "consideringEarlyApply") ? "Yes" : "No"
  }
};

CollegeProfiles.getHighschoolStudentData = function(user, profile) {
  return {
    "Created At": moment(dotGet(profile, "created")).format("MMM Do YYYY, h:mm A"),
    "Email Address": dotGet(user, "emails.0.address") || "",
    "Date of Birth": dotGet(profile, "demographics.dateOfBirth") ? moment(dotGet(profile, "demographics.dateOfBirth")).format('M-D-YYYY') : "",
    "First Name": dotGet(profile, "firstName") || "",
    "Last Name": dotGet(profile, "lastName") || "",
    "Description": dotGet(profile, "description") || "",
    "Zip Code": dotGet(profile, "location.zip") ? dotGet(profile, "location.zip") : "",
    "City": dotGet(profile, "location.city") || "",
    "State": dotGet(profile, "location.state") || "",
    "Street Address": dotGet(profile, "location.address") || "",
    "High School": dotGet(profile, "highschool.current.name") || "",
    "CEEB Code": dotGet(profile, "highschool.current.ceeb") || "",
    "Expected Year of Graduation": dotGet(profile, "highschool.expectedGraduationYear") || "",
    "GPA": dotGet(profile, "highschool.gpaGeneral.gpa") || "",
    "SAT": dotGet(profile, "tests.sat.composite") || "",
    "ACT": dotGet(profile, "tests.act.composite") || "",
    "Intended Major": dotGet(profile, "intentions.intendToStudy") || "",
    "College Transfer": dotGet(profile, "demographics.transfer") ? "Yes" : "No",
    "Most Recent College": dotGet(profile, "demographics.mostRecentCollege") || "",
    "Contactable": dotGet(profile, "contactable") || ""
  }
};
