SimpleSchema.messages({
  atnameTaken: "This atname is already taken",
  collegeHashtagNotRecognized: "Hmmm, I can't find a college with that hashtag.",
  domesticPhoneNumber: "Please use a 10 digit phone number. International numbers are not supported.",
  emailNotUnique: "This email address is in use by another account.",
  finishQuestionsFirst: "Hold up, we need to finish just a couple more questions.",
  invalidCollegeEvent: "Please reply with a number from the list below.",
  invalidOption: "Please pick one of these options.",
  matchNotFinished: "Hold your horses, one school at a time!",
  mustAgreeToTerms: "You must agree to the terms to sign up.",
  not1to5: "Please choose a number between 1 and 5.",
  notValidUnderscoreTemplate: "The underscore template did not compile correctly.",
  phoneNotUnique: "This phone number is in use by another account.",
  usZipCode: "Please specify a US 5-digit zip code or 9-digit zip+4 code.",
  yearStringInvalid: "Please respond with a year in full (i.e., with four digits, like '1999')."
});

GradeTable = {
  'A+ (100 - 97)': 4,
  'A (96.9 - 93)': 4,
  'A- (92.9 - 90)': 3.7,
  'B+ (89.9 - 87)': 3.3,
  'B (86.9 – 83)': 3,
  'B- (82.9 – 80)': 2.7,
  'C+ (79.9 – 77)': 2.3,
  'C (76.9 - 73)': 2.0,
  'C- (72.9 – 70)': 1.7,
  'D+ (69.9 – 67)': 1.3,
  'D (66.9 – 63)': 1.0,
  'D- (62.9 – 60)': 0.7,
  'F (below 60)': 0
}
GradeAdjustmentTable = {
  'Regular': 0,
  'Honors': 0.5,
  'AP/IB': 1,
  'College course': 1
}

// fields are functions, built from fieldDefs, which take "options" to
// override or add to the default in fieldDefs.
fields = {}
/**
 * Returns an autoValue function which uses the given callable to get a value
 * for use on insert only.  Forbids further modification of the value after
 * insert.
 */
fields.insertOnlyValue = function (callable) {
  return function () {
    if (this.isInsert) {
      return callable.call(this)
    } else if (this.isUpsert) {
      return {$setOnInsert: callable.call(this)}
    } else {
      this.unset()
    }
  }
}

/**
 * Returns an autoValue-compliant function which uses the given callable to get
 * the default value.  This is equivalent to setting ``defaultValue: X`` where
 * X is a function instead of a literal.
 */
fields.callableDefaultValue = function (callable) {
  return function () {
    if (!this.isSet) {
      if (this.isInsert) {
        return callable.call(this)
      } else if (this.isUpsert) {
        return callable.call(this)
      }
    }
  }
}

fields.cleanPhone = function () {
  return this.value && this.value.replace(/^\+1/, '').replace(/[^\d]/g, '')
}

// fieldDefs are SimpleSchema field definitions.
var fieldDefs = {
  id: {type: String, regEx: SimpleSchema.RegEx.Id},
  string: {type: String},
  number: {type: Number, min: 0},
  percent: {type: Number, min: 0, max: 100, decimal: true},
  bool: {type: Boolean},
  date: {type: Date},
  object: {type: Object},
  black_box: {type: Object, blackbox: true},
  string_array: {type: [String]},
  object_array: {type: [Object]},
  yearString: {
    type: String,
    custom: function() { 
      if (/^\d{4}/.test(this.value)) {
        return true;
      } else {
        return "yearStringInvalid";
      }
    }
  },
  name_part: {type: String, max: 140},
  long_string: {type: String, max: 3000},
  really_long_string: {type: String},
  // dialogObject: new SimpleSchema({
  //   _id: fields.string,
  //   options: {type: Object, optional: true},
  //   state: {type: String, optional: true},
  //   userResponded: {type: String, optional: true}
  // }),
  email: {type: String, regEx: SimpleSchema.RegEx.Email, max: 140},
  created_date: {
    type: Date,
    autoValue: fields.insertOnlyValue(function () {
      return new Date()
    })
  },
  phone_number: {
    type: String,
    min: 10,
    max: 15,
    autoValue: fields.cleanPhone,
    custom: function () {
      if (this.isSet && this.value) {
        // ensure it is 10 digits.
        if (this.value.length != 10) {
          return 'domesticPhoneNumber'
        }
      }
    }
  },
  facebook_id: {
    type: String,
    regEx: /^\d{1,19}$/
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    /* In AH-802 we had an unexpected error due to the 200 character limit.
     * Stackoverflow suggests that 2000 characters is a good upper bound:
     * https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
    /*/
    max: 2000
  },
  address: {type: String},
  state: {
    type: String
    // regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  state_or_province: {
    type: String,
    regEx: /^A[BLKSZRAEP]|BC|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ABDEHINOPST]|N[BCDEHJLMSTVY]|O[HKNR]|P[AERW]|QC|RI|S[CDK]|T[NX]|UT|V[AIT]|W[AIVY]|YT$/
  },
  us_region: {
    type: String,
    allowedValues: ['Northwest', 'Northeast', 'Southeast', 'Southwest', 'Midwest', 'West']
  },
  gender: {
    type: String,
    allowedValues: ['Female', 'Male', 'Other']
  },
  degree: {
    type: String,
    allowedValues: ["Bachelor's", "Master's", 'JD/MBA', 'PhD/MD']
  },
  parent_marital_status: {
    type: String,
    allowedValues: ['never married', 'married', 'civil union/domestic partners', 'widowed', 'separated', 'divorced']
  },
  permanent_home_parent: {
    type: String,
    allowedValues: ['my mother', 'my father', 'both parents', 'my legal guardian', 'foster parents', 'other']
  },
  parent_role: {
    type: String,
    allowedValues: ['Mother', 'Father', 'Guardian']
  },
  attending: {
    type: String,
    allowedValues: ['attending', 'not attending', 'unsure', 'already submitted']
  },
  parental_situation: {
    type: String,
    allowedValues: ['Married or unmarried and live together', 'Separated or divorced', 'At least one parent deceased', 'Not in contact with any parent']
  },
  sibling_relationship: {
    type: String,
    allowedValues: ['Brother', 'Sister', 'Step-brother', 'Step-sister', 'Other']
  },
  graduating_class: {
    type: Number,
    allowedValues: _.range(2014, 2025, 1)
  },
  high_school_type: {
    type: String,
    allowedValues: ['Public', 'Charter', 'Independent', 'Religious', 'Home', 'Summer', 'Enrichment']
  },
  activity_type: {
    type: String,
    allowedValues: ['art', 'music', 'communityService', 'theater', 'academicClubs', 'newspaper', 'sports', 'studentGovernment', 'job', 'other'],
    autoform: {
      options: [
        {
          value: 'art',
          label: 'Art'
        },
        {
          value: 'music',
          label: 'Music'
        },
        {
          value: 'communityService',
          label: 'Community Service'
        },
        {
          value: 'theater',
          label: 'Theater'
        },
        {
          value: 'academicClubs',
          label: 'Academic Clubs'
        },
        {
          value: 'newspaper',
          label: 'Newspaper'
        },
        {
          value: 'sports',
          label: 'Sports'
        },
        {
          value: 'studentGovernment',
          label: 'Student Government'
        },
        {
          value: 'job',
          label: 'Job'
        },
        {
          value: 'other',
          label: 'Other'
        }
      ]
    }
  },
  class_rank_type: {
    type: String,
    allowedValues: ['Exact', 'Percentile']
  },
  class_rank_description: {
    type: String,
    allowedValues: ['Top 10', 'Top 10%', 'Top 25%', 'Top half', 'Bottom half', "Don't know"]
  },
  athletic_divisions: {
    type: String,
    allowedValues: ['Division I', 'Division II', 'Division III or NAIA']
  },
  gpa_weighting: {
    type: String,
    allowedValues: ['Weighted', 'Unweighted', "Don't know"]
  },
  feeling_about_application: {
    type: String,
    allowedValues: ['I got this', 'A little shaky', 'Nervous', 'Freaked out']
  },
  demo_evaluation: {
    type: String,
    allowedValues: ['Mind blown', 'Impressed', 'Nonplussed', "Don't get it", 'Hate it']
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
    allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior']
  },
  high_school_years: {
    type: [String],
    allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior']
  },
  high_school_semester: {
    type: String,
    allowedValues: ['First Semester', 'Second Semester', 'Both']
  },
  high_school_level: {
    type: String,
    allowedValues: ['Regular', 'Honors', 'AP/IB', 'College course', 'Vocational']
  },
  high_school_grade: {
    type: String,
    allowedValues: _.sortBy(_.keys(GradeTable)).concat(['N/A'])
  },
  duration: {type: String, max: 160},
  honor_level_of_recognition: {
    type: String,
    allowedValues: ['Local', 'State', 'National', 'International']
  },
  essay: {
    type: String,
    max: 5000,
    min: 1
  },
  yes_no_whatever: {
    type: String,
    allowedValues: ['Yes', 'No', 'Whatever']
  },
  terms_and_privacy: {
    type: Boolean,
    defaultValue: false,
    label: 'Agree to the Terms and Privacy Policy',
    custom: function () {
      if (this.value !== true) {
        return 'mustAgreeToTerms'
      }
    }
  },
  expected_graduation_year: { type: Number, min: new Date().getFullYear() - 70, max: new Date().getFullYear() + 30 },
  zip_code: {
    type: String,
    min: 1,
    max: 30
    // custom: function() {
    //  if (this.isSet && this.value) {
    //    if (!/\d{5}(-?\/d{4})?/.test(this.value.toString())) {
    //      return "usZipCode";
    //    }
    //  }
    // }
  },
  skill_level: {
    type: String,
    allowedValues: ['novice', 'proficient', 'expert', 'master'],
    autoform: {
      options: [
        {
          value: 'novice',
          label: 'Novice'
        },
        {
          value: 'proficient',
          label: 'Proficient'
        },
        {
          value: 'expert',
          label: 'Expert'
        },
        {
          value: 'master',
          label: 'Master'
        }
      ]
    }
  },
  language_level: {
    type: String,
    allowedValues: ['novice', 'proficient', 'expert', 'native speaker']
  },
  recommender_role: {
    type: String,
    allowedValues: ['Teacher', 'Counselor', 'Employer', 'Other']
  },
  referral_source: {
    type: String,
    allowedValues: ['A friend', 'Online', 'A teacher or counselor', 'A family member', 'I dunno']
  },
  description: {
    type: String,
    allowedValues: ['Student', 'Parent', 'Educator', 'Other']
  },
  freshman_or_transfer: {
    type: String,
    allowedValues: ['Freshman', 'Transfer']
  },
  // /branded college specific
  status: {
    type: String,
    allowedValues: ['Started', 'Inquiry', 'Admit', 'Admit: Withdrawn', 'Applicant: Complete', 'Applicant: Denied', 'Applicant: Incomplete', 'Applicant: Wait list', 'Enrolled', 'Suspect', 'Confirmed', 'Applicant: Defer', 'Applicant: Withdrawn', 'Prospect', 'Applicant: Wait List Denied', 'Applicant: Wait List Declined', 'Applicant: Success Academy', 'Admit: Declined', 'Unknown']
  },
  student_type: {
    type: String,
    allowedValues: ['Freshman', 'Dual Enrollment', 'Non-Degree', 'Non-Traditional', 'Postbaccalaureate', 'Transfer', 'Transient', 'Unknown', 'Continuing or Returning', 'Intl Exchange Student', 'Joint Enrollment', 'Program for Excellence', 'GSU-62']
  },
  student_category: {
    type: String,
    allowedValues: ['prospect', 'applicant', 'admit', 'enrolled', 'dropout', 'alumni']
  },
  preference_type: {
    type: String,
    allowedValues: ['Residence hall', 'Off-campus', 'Parents', 'Married housing', 'Fraternity/Sorority']
  },
  profile_description: {
    type: String,
    allowedValues: ['current student', 'transfer', 'senior', 'junior', 'soph or younger', 'parent', 'other', 'prospective']
  },
  planned_application: {
    type: String,
    allowedValues: ['now', 'this year', 'not applying']
  },
  Season: {
    type: String,
    allowedValues: ['Fall', 'Spring', 'Summer', 'Winter']
  },
  other_features: {
    type: [String],
    allowedValues: ['Buying textbooks', 'Travel planning', 'Finding internships', 'Health and wellness', 'Banking and budgeting', 'Pizza delivery', 'Study support', 'Campus info', 'Something else']
  }
}

// Attach functions to fields.
_.each(fieldDefs, function (def, name) {
  fields[name] = function (options) {
    return _.extend({}, def, options)
  }
})
