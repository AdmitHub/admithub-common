SimpleSchema.messages({
  domesticPhoneNumber: "Please use a 10 digit phone number. International numbers are not supported.",
  mustAgreeToTerms: "You must agree to the terms to sign up.",
  phoneNotUnique: "This phone number is in use by another account.",
  emailNotUnique: "This email address is in use by another account.",
  notValidUnderscoreTemplate: "The underscore template did not compile correctly.",
  usernameInvalid: "Username must only contain letters and be between 3 and 15 characters long",
  usZipCode: "Please specify a US 5-digit zip code or 9-digit zip+4 code.",
  invalidCollegeEvent: "Please reply with a number from the list below.",
  not1to5: "Please choose a number between 1 and 5.",
  invalidOption: "Please pick one of these options.",
  matchNotFinished: "Hold your horses, one school at a time!",
  collegeHashtagNotRecognized: "Hmmm, I can't find a college with that hashtag.",
  finishQuestionsFirst: "Hold up, we need to finish just a couple more questions.",
  hashtagTaken: "This hashtag is already taken"
});

GradeTable = {
  "A+ (100 - 97)": 4,
  "A (96.9 - 93)": 4,
  "A- (92.9 - 90)": 3.7,
  "B+ (89.9 - 87)": 3.3,
  "B (86.9 – 83)": 3,
  "B- (82.9 – 80)": 2.7,
  "C+ (79.9 – 77)": 2.3,
  "C (76.9 - 73)": 2.0,
  "C- (72.9 – 70)": 1.7,
  "D+ (69.9 – 67)": 1.3,
  "D (66.9 – 63)": 1.0,
  "D- (62.9 – 60)": 0.7,
  "F (below 60)": 0
};
GradeAdjustmentTable = {
  "Regular": 0,
  "Honors": 0.5,
  "AP/IB": 1,
  "College course": 1
};

// fields are functions, built from fieldDefs, which take "options" to
// override or add to the default in fieldDefs.
fields = {};
/**
 * Returns an autoValue function which uses the given callable to get a value
 * for use on insert only.  Forbids further modification of the value after
 * insert.
 */
fields.insertOnlyValue = function(callable) {
  return function() {
    if (this.isInsert) {
      return callable.call(this);
    } else if (this.isUpsert) {
      return {$setOnInsert: callable.call(this)};
    } else {
      this.unset();
    }
  };
}

/**
 * Returns an autoValue-compliant function which uses the given callable to get
 * the default value.  This is equivalent to setting ``defaultValue: X`` where
 * X is a function instead of a literal.
 */
fields.callableDefaultValue = function(callable) {
  return function() {
    if (!this.isSet) {
      if (this.isInsert) {
        return callable.call(this);
      } else if (this.isUpsert) {
        return callable.call(this);
      }
    }
  }
};

fields.cleanPhone = function(phone) {
  return phone && phone.replace(/^\+1/,'').replace(/[^\d]/g, '');
};

// fieldDefs are SimpleSchema field definitions.
var fieldDefs = {
  id: {type: String, regEx: SimpleSchema.RegEx.Id},
  string: {type: String, max: 50},
  number: {type: Number, min: 0},
  percent: {type: Number, min: 0, max: 100, decimal: true},
  bool: {type: Boolean},
  date: {type: Date},
  name_part: {type: String, max: 140},
  username: {type: String, custom: function(){
    if(/^[a-z0-9A-Z_]{3,15}$/.test(this.value)) {
      return true;
    } else {
      return "usernameInvalid";
    }
  }},
  email: {type: String, regEx: SimpleSchema.RegEx.Email, max: 140},
  created_date: {
    type: Date,
    autoValue: fields.insertOnlyValue(function() {
      return new Date;
    })
  },
  phone_number: {
    type: String,
    min: 10,
    max: 15,
    custom: function() {
      if (this.isSet && this.value) {
        // ensure it is 10 digits.
        if (this.value.replace(/[^\d]/g, '').length != 10) {
          return "domesticPhoneNumber";
        }
      }
    }
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    max: 200
  },
  address: {type: String},
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  state_or_province: {
    type: String,
    regEx: /^A[BLKSZRAEP]|BC|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ABDEHINOPST]|N[BCDEHJLMSTVY]|O[HKNR]|P[AERW]|QC|RI|S[CDK]|T[NX]|UT|V[AIT]|W[AIVY]|YT$/
  },
  us_region: {
    type: String,
    allowedValues: ["Northwest", "Northeast", "Southeast", "Southwest", "Midwest", "West"]
  },
  race: {
    type: String,
    allowedValues: ["American Indian/Alaskan Native", "Asian", "Black/African-American", "Hispanic/Latino", "Native Hawaiian/ Pacific Islander", "White"],
  },
  gender: {
    type: String,
    allowedValues: ["Female", "Male", "Other"]
  },
  degree: {
    type: String,
    allowedValues: ["Bachelor's", "Master's", "JD/MBA", "PhD/MD"]
  },
  parent_marital_status: {
    type: String,
    allowedValues: ["never married", "married", "civil union/domestic partners", "widowed", "separated", "divorced"]
  },
  permanent_home_parent: {
    type: String,
    allowedValues: ["my mother", "my father", "both parents", "my legal guardian", "foster parents", "other"]
  },
  parent_role: {
    type: String,
    allowedValues: ["Mother", "Father", "Guardian"]
  },
  sibling_relationship: {
    type: String,
    allowedValues: ["Brother", "Sister", "Step-brother", "Step-sister", "Other"]
  },
  graduating_class: {
    type: Number,
    allowedValues: _.range(2014, 2025, 1)
  },
  high_school_type: {
    type: String,
    allowedValues: ["Public", "Charter", "Independent", "Religious", "Home", "Summer", "Enrichment"]
  },
  activity_type: {
    type: String,
    allowedValues: ["art", "music", "communityService", "theater", "academicClubs", "newspaper", "sports", "studentGovernment", "job", "other"]
  },
  class_rank_type: {
    type: String,
    allowedValues: ["Exact", "Percentile"]
  },
  class_rank_description: {
    type: String,
    allowedValues: ["Top 10", "Top 10%", "Top 25%", "Top half", "Bottom half", "Don't know"]
  },
  athletic_divisions: {
    type: String,
    allowedValues: ["Division I", "Division II", "Division III or NAIA"]
  },
  gpa_weighting: {
    type: String,
    allowedValues: ["Weighted", "Unweighted", "Don't know"]
  },
  sat_score: {type: Number, min: 200, max: 800},
  sat_composite_score: {type: Number, min: 600, max: 2400},
  psat_composite_score: {type: Number, min: 320, max: 1520},
  sat_essay_score: {type: Number, min: 2, max: 12},
  act_score: {type: Number, min: 1, max: 36},
  act_composite_score: {type: Number, min: 1, max: 36},
  act_essay_score: {type: Number, min: 1, max: 6},
  high_school_year: {
    type: String,
    allowedValues: ["Freshman", "Sophomore", "Junior", "Senior"]
  },
  high_school_years: {
    type: [String],
    allowedValues: ["Freshman", "Sophomore", "Junior", "Senior"]
  },
  high_school_semester: {
    type: String,
    allowedValues: ["First Semester", "Second Semester", "Both"]
  },
  high_school_level: {
    type: String,
    allowedValues: ["Regular", "Honors", "AP/IB", "College course", "Vocational"]
  },
  high_school_grade: {
    type: String,
    allowedValues: _.sortBy(_.keys(GradeTable)).concat(["N/A"])
  },
  duration: {type: String, max: 160},
  honor_level_of_recognition: {
    type: String,
    allowedValues: ["Local", "State", "National", "International"]
  },
  essay: {
    type: String,
    max: 5000,
    min: 1
  },
  yes_no_whatever: {
    type: String,
    allowedValues: ["Yes", "No", "Whatever"],
  },
  terms_and_privacy: {
    type: Boolean,
    defaultValue: false,
    label: "Agree to the Terms and Privacy Policy",
    custom: function() {
      if (this.value !== true) {
        return "mustAgreeToTerms";
      }
    }
  },
  expected_graduation_year: { type: Number, min: new Date().getFullYear(), max: new Date().getFullYear() + 20 },
  zip_code: {
    type: String,
    min: 5,
    max: 10,
    custom: function() {
      if (this.isSet && this.value) {
        if (!/\d{5}(-?\/d{4})?/.test(this.value.toString())) {
          return "usZipCode";
        }
      }
    }
  },
  skill_level: {
    type: String,
    allowedValues: ["novice", "proficient", "expert", "master"]
  },
  language_level: {
    type: String,
    allowedValues: ["novice", "proficient", "expert", "native speaker"]
  },
  recommender_role: {
    type: String,
    allowedValues: ["Teacher", "Counselor", "Employer", "Other"],
  },
  referral_source: {
    type: String,
    allowedValues: ["A friend", "Online", "A teacher or counselor", "A family member", "I dunno"]
  },
  description: {
    type: String,
    allowedValues: ["Student", "Parent", "Educator", "Other"],
  },
  freshman_or_transfer: {
    type: String,
    allowedValues: ["Freshman", "Transfer"]
  }
};

// Attach functions to fields.
_.each(fieldDefs, function(def, name) {
  fields[name] = function(options) {
    return _.extend({}, def, options);
  };
});
