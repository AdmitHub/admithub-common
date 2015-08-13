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
});

var _locationSchema = new SimpleSchema({
  "address": fields.address(o),
  "city": fields.string(o),
  "state": fields.state(o),
  "zip": fields.zip_code(_.extend(o, {
    autoValue: function(mod) {
      if(mod.$set && mod.$set.location && mod.$set.location.zip && this.value !== mod.$set.location.zip) {
        var zipcodeLookup = zipcodes.lookup(mod.$set.location.zip);

        if(zipcodeLookup !== undefined) {
          mod.$set.location = {
            city: zipcodeLookup.city,
            state: zipcodeLookup.state,
            zip: zipcodeLookup.zip
          };
        } else {
          mod.$set.location = {
            zip: mod.$set.location.zip
          };
        }
      }
    }
  }))
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
  "transcript": {type: _transcriptSchema, optional: true}
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
    "years": fields.high_school_years({optional: true}),
    "hoursPerWeek": fields.number({max: 168, optional: true}),
    "weeksPerYear": fields.number({max: 52, optional: true}),
    "intentToPursue": fields.bool(o),
    "description": fields.string({max: 160, optional: true}),
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
    "summary": fields.string({max: 160, optional: true}),
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
  "additionalInformation": fields.essay(o)
});

var _recommendationSchema = new SimpleSchema({
  "friendsAdjectives": fields.string({max: 140, optional: true}),
  "recommenders": {type: [new SimpleSchema({
    "name": fields.name_part(o),
    "role": fields.recommender_role(o),
    "subjects": fields.string(o),
    "grades": fields.high_school_years(o),
    "favoriteAcademicLesson": fields.string(o),
    "fondestPersonalMemory": fields.string(o)
  })], optional: true}
});

var _preferenceSchema = new SimpleSchema({
  "dreamCollege": {type: new SimpleSchema({
    "name": fields.string({max: 140, optional: true}),
    "reason": fields.string({max: 140, optional: true}),
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
    "flipFlops": fields.bool(o),
    "allSeasons": fields.bool(o),
    "frozenTundra": fields.bool(o),
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
    "sticks": fields.bool(o),
    "irrelevant": fields.bool(o)
  }), optional: true},

  "region": {type: new SimpleSchema({
    "northeast": fields.bool(o),
    "midwest": fields.bool(o),
    "south": fields.bool(o),
    "west": fields.bool(o),
    "any": fields.bool(o)
  }), optional: true},

  "closeToHome": fields.yes_no_whatever(o), // within 50 miles
  "sameState": fields.yes_no_whatever(o),

  "plannedColleges": {type: [new SimpleSchema({
    name: fields.string(o)
  })], optional: true},

  "somethingInteresting": fields.string(o),

  "likes": {type: [String], regEx: SimpleSchema.RegEx.Id, optional: true}, // college ID
  "dislikes": {type: [String], regEx: SimpleSchema.RegEx.Id, optional: true} // college ID
});

var _intentionSchema = new SimpleSchema({
  "financialAid": fields.bool(o), // need-based financial aid intent
  "intendToStudy": fields.string({max: 140, optional: true}),
  "athleticRecruit": fields.bool(o),
  "athleticRecruitLevel": fields.athletic_divisions(o)
});

var _metaFields = new SimpleSchema({
  "initialSurvey": {type: new SimpleSchema({
    "finished": fields.bool(o),
    "evaluation": fields.string({allowedValues: ["Awesome", "Pretty good", "meh", "lame"], optional: true}),
    "evaluationRecommend": fields.string({max: 140, optional: true}),
    "podcastGuest": fields.bool(o),
    "utm_medium": fields.string(o)
  }), optional: true},
  "match": {type: new SimpleSchema({
    "skip": fields.bool(o),
    "finished": fields.bool(o)
  }), optional: true},
  "resumeBot": {type: new SimpleSchema({
    "finished": fields.bool(o)
  }), optional: true},
  "questionBot": {type: new SimpleSchema({
    "finished": fields.bool(o)
  }), optional: true}
});
CollegeProfileSchema = new SimpleSchema({
  // the only non-optional field
  "userId": {type: String, regEx: SimpleSchema.RegEx.Id},
  "name": fields.name_part({
    optional: true,
    autoValue: function() {
      if (this.isSet) {
        Meteor.users.update(this.userId, {
          $set: {
            "profile.name": this.value
          }
        });
      }
    }
  }),
  "headline": {type: String, max: 160, optional: true},
  "location": {type: _locationSchema, optional: true},
  "demographics": {type: _demographicsSchema, optional: true},
  "parents": {type: _parentSchema, optional: true},
  "siblings": {type: _siblingSchema, optional: true},
  "highschool": {type: _highschoolSchema, optional: true},
  "courses": {type: _courseSchema, optional: true},
  "tests": {type: _standardizedTestSchema, optional: true},
  "honors": {type: _honorSchema, optional: true},
  "activities": {type: _activitySchema, optional: true},
  "skillsOrInterests": {type: [_skillSchema], optional: true},
  "languages": {type: [_languageSchema], optional: true},
  "volunteer": {type: _volunteerSchema, optional: true},
  "essays": {type: _essaySchema, optional: true},

  "intentions": {type: _intentionSchema, optional: true},
  "recommendations": {type: _recommendationSchema, optional: true},

  "preferences": {type: _preferenceSchema, optional: true},

  "meta": {type: _metaFields, optional: true},

  "modified": {type: Date, autoValue: function() { return new Date(); }},
  "created": fields.date(),
  "contactable": fields.bool({optional: true}),
  "referralSource": fields.referral_source({optional: true})
});

CollegeProfiles = new Mongo.Collection("collegeprofiles");
CollegeProfiles.attachSchema(CollegeProfileSchema);


CollegeProfiles.before.update(function(userId, doc, fieldNames, modifier, options) {
  // Might be cleaner to implement this as an autoValue function, but as of
  // 2015-04-23, we get a mongo error ("cannot $set both "highschool" and
  // "highschool.gpaGeneral.normalizedGPA") if we do so.
  var gpa = dotGet(modifier.$set, "highschool.gpaGeneral.gpa");
  var range = dotGet(modifier.$set, "highschool.gpaGeneral.range");
  if (gpa) {
    if (!range && gpa <= 4.0) {
      // assume a range of 4.0 if plausible
      range = 4.0;
    }
    if (range) {
      modifier.$set.highschool.gpaGeneral.normalizedGPA = (Math.min(gpa, range) / range) * 4.0;
    }
  }
});

collegeProfileCountAnsweredQuestions = function(collegeProfile) {
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
