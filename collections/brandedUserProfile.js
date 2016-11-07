var o = {optional: true};

BrandedUserSchema = new SimpleSchema({
  userId: fields.string(),
  "_id": {optional: true, type: null},
  crmId: fields.string({optional: false}), //gsu unique id
  created: fields.date(),
  collegeName: fields.string(o),
  enrollmentId: fields.string(o), //pantherId for gsu
  schoolEmail: fields.email(o),
  entryYear: fields.number(o),
  entryTerm: fields.string(o),
  studyGroupMember: fields.bool(o),
  permittedUser: fields.bool(o),
  email: fields.string(o),
  phone: fields.string(o),
  name: {type: new SimpleSchema({
    first: fields.string(o),
    last: fields.string(o),
    middleName: fields.string(o),
    full: fields.string(o),
    nickName: fields.string(o),
  }), optional: true},
  dob: fields.date(o),
  location: {type: new SimpleSchema({
    address1: fields.address(o),
    address2: fields.address(o),
    address3: fields.address(o),
    city: fields.string(o),
    county: fields.string(o),
    state: fields.state(o),
    zip: fields.zip_code(_.extend(o)),
    country: fields.string(o),
  }), optional: true},
  inStateStudent: fields.bool(o),
  application: {type: new SimpleSchema({
    status: fields.status(o), 
    statusExtended: fields.string(o),
    receivedHSTranscript: fields.bool(o)
  }), optional: true},
  profile: {type: new SimpleSchema({
    studentType: fields.student_type(o),
    studentCategory: fields.student_category(o),
    citizenVerified: fields.bool(o),
    immunizationHold: fields.bool(o),
    emergencyContactHold: fields.bool(o),
    hsName: fields.string(o),
    hsZip: fields.zip_code(o),
    hsGradYear: fields.expected_graduation_year(o),
    intendedMajor: fields.long_string(o),
  }), optional: true},
  finAid: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o), 
    finAidComplete: fields.bool(o), 
    fafsaComplete: fields.bool(o),
    finAidInterest: fields.bool(o),
    scholarshipAwarded: fields.bool(o),
    scholarshipAccepted: fields.bool(o),
    missingEntryLoan: fields.bool(o),
    missingPromissoryLoan: fields.bool(o),
    acceptedOfferInternal: fields.bool(o),
    offered: fields.bool(o),
  }),optional: true},
  housing: {type: new SimpleSchema({
    onCampus: fields.bool(o),
    preferenceType: fields.preference_type(o),
    depositPaid: fields.bool(o), 
    depositDate: fields.date(o), 
  }),optional: true},
  orientation:{type: new SimpleSchema ({
    needsToRsvp: fields.bool(o), 
    attended: fields.bool(o), 
    attendedDate: fields.date(o), 
    registeredDate: fields.date(o)
  }),optional: true},
  textSetting:{type: new SimpleSchema ({
    canText: fields.bool(o),
    wrongNumber: fields.bool(o), // moved to user doc
    newPhone: fields.phone_number(o)
  }), optional: true},
  tests: {type: new SimpleSchema ({
    gpa: fields.number({decimal: true, optional: true}),
    maxGpa: fields.number({decimal: true, optional: true}),
    satComposite: fields.sat_composite_score(o),
    satMath: fields.sat_score(o),
    satReading: fields.sat_score(o), 
    satEssay: fields.sat_essay_score(o), 
    satAnalysis: fields.sat_essay_score(o), 
    satWriting: fields.sat_essay_score(o), 
    actComposite: fields.act_composite_score(o),
    actMath: fields.act_composite_score(o),
    actScience: fields.act_composite_score(o),
    actEnglish: fields.act_composite_score(o),
    actReading: fields.act_composite_score(o),
    actWriting: fields.act_composite_score(o),
    actIdeasAnalysis: fields.act_composite_score(o),
    actDevAndSupport: fields.act_composite_score(o),
    actOrganization: fields.act_composite_score(o),
    actLangaugeConvention: fields.act_composite_score(o),
  }),optional: true},
  interest: {type: new SimpleSchema({
    crm: fields.number({min: 0, max: 5, optional: true}),
  }), optional: true},
  intent: {type: new SimpleSchema({
    intendsToEnroll: fields.bool(o), 
    intentReceivedDate: fields.date(o), 
    counselorCanContact: fields.bool(o),
  }), optional: true},
  _profile: {type: new SimpleSchema({
    description: fields.profile_description(o),
    parent: fields.bool(o),
    plannedApplication: fields.planned_application(o),
  }), optional: true},
  _finAid: {type: new SimpleSchema({
    finAidInterest: fields.bool(o),
    gapInAid: fields.bool(o), // _internal.gapInAid
    needHelpPaying: fields.bool(o), // _internal.needHelpPaying
  }),optional: true},
  _housing: {type: new SimpleSchema({
    intention: fields.string(o), // _internal.housingResponse
  }),optional: true},
  _parking: {type: new SimpleSchema({
    bringCar: fields.bool(o), // _internal.needsParking
  }), optional: true},
  _intent: {type: new SimpleSchema({
    intendsToEnroll: fields.bool(o),
    whyUnsure: fields.string(o), //was internal.whyUnsure
    whyUnsureExtended: fields.long_string(o), //was internal.whyUnsureExtended
    whyNotAttending: fields.long_string(o), // internal.whyNotAttending
    whyNotAttendingExtended: fields.long_string(o), //internal.whyNotAttendingExtended
    date: fields.date(o), //internal.intentDate
    followUpIntent: fields.attending(o), // internal./followUpIntent
    unsure: fields.bool(o), // internal.intentUnsure todo - mark this in unsure questions
    alreadySubmitted: fields.bool(o), //new
    whyNoCollege: fields.string(o), //internal.whyNoCollege
    whyHere: fields.long_string(o), // internal.whyHere
    goingInstead: fields.long_string(o), // internal.goingInstead
    howSolid: fields.string(o) //internal.howSolid
  }), optional: true},
  _orientation: {type: new SimpleSchema({
    best: fields.string(o), // internal.orienation.best
    experience: fields.string(o), // internal.orientation.experience.best
    experienceExtended: fields.long_string(o), // internal.orientation.experienceExtended.best
    stoodOut: fields.long_string(o), // internal.orientation.stoodOut
    improvement: fields.long_string(o), // internal.orientation.improvement
    willYouAttend: fields.string(o), // internal.orientation.willYouAttend
    registered: fields.bool(o), // internal.registeredOrientation
  }), optional: true},
  _general: {type: new SimpleSchema({
    //interest: fields.number({min: 0, max: 5, optional: true}),
    //counselorCanContact: fields.bool(o),
    secondGroup: fields.bool(o), // internal.secondGroup
    whyNotTexting: fields.string(o), //internal.whyNotTexting
  }), optional: true},
  _aidLastPush: {type: new SimpleSchema({ // all internal._aidLast 
    planSubmitFafsa: fields.bool(o), // all internal._aidLast 
    helpCompletingFafsa: fields.string(o), // all internal._aidLast 
    planAttendOrientation: fields.bool(o), // all internal._aidLast 
    allSetHousing: fields.bool(o), // all internal._aidLast
    unableToMakePayment: fields.bool(o) // all internal._aidLast 
  }), optional: true},
  _finalStudySurveyBot: {type: new SimpleSchema({
    enrollmentHowHard: fields.string(o),
    textHowHelpful: fields.string(o),
    helpfulInTransition: fields.long_string(o),
    recommendToFriend: fields.long_string(o),
    recommendToSchool: fields.long_string(o),
    recommendImprovements: fields.long_string(o), 
    howToImprove: fields.long_string(o),
    whatElseCanIDo: fields.other_features(o),
    whatElseCanIDoExtended: fields.long_string(o),
    didYouRead: fields.bool(o),
    whyNoResponse: fields.long_string(o),
    didYouRead: fields.bool(o),
    whyNoText: fields.long_string(o)
  }),optional: true},
  supplemental: {type: new SimpleSchema({
    first: fields.string(o),
    second: fields.string(o),
    third: fields.string(o),
    fourth: fields.string(o),
    fifth: fields.string(o)
  }), optional: true},
  presumedState: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o), // finAid.fafsaReceived /
    finAidComplete: fields.bool(o), // finAid.finAidComplete /
    housingDepositPaid: fields.bool(o), // housing.depositPaid /
    orientationAttendedDate: fields.date(o), // orientation.attendedDate /
    orientationNeedsToRsvp: fields.bool(o), // orientation.needsToRsvp /
    intendsToEnroll: fields.bool(o) // intent.intendsToEnroll /
  }), optional: true},
  _gather: {type: new SimpleSchema({
    firstName: fields.string(o), 
    lastName: fields.string(o), 
    middleInitial: fields.string(o), 
    email: fields.email(o), 
    phone: fields.phone_number(o), 
    dob: fields.date(o), 
    hsName: fields.string(o),
    hsZip: fields.zip_code(o),
    hsGradYear: fields.expected_graduation_year(o),
    intendedMajor: fields.long_string(o),
    zip: fields.zip_code(o), 
    address: fields.string(o), 
    gpa: fields.number({decimal: true, optional: true}),
    maxGpa: fields.number({decimal: true, optional: true}),
    satComposite: fields.sat_composite_score(o),
    satMath: fields.sat_score(o),
    satReading: fields.sat_score(o), 
    satEssay: fields.sat_essay_score(o), 
    satAnalysis: fields.sat_essay_score(o), 
    satWriting: fields.sat_essay_score(o), 
    actComposite: fields.act_composite_score(o),
    actMath: fields.act_composite_score(o),
    actScience: fields.act_composite_score(o),
    actEnglish: fields.act_composite_score(o),
    actReading: fields.act_composite_score(o),
    actWriting: fields.act_composite_score(o),
    actIdeasAnalysis: fields.act_composite_score(o),
    actDevAndSupport: fields.act_composite_score(o),
    actOrganization: fields.act_composite_score(o),
    actLangaugeConvention: fields.act_composite_score(o),
  }), optional: true},
  _oneOff: {
    type: Object,
    blackbox: true,
    optional: true
  },
  _responseBlackBox: {
    type: Object,
    blackbox: true,
    optional: true
  },
  _custom: {
    type: Object,
    blackbox: true,
    optional: true
  },
  meta: {type: new SimpleSchema({
    pounceIntroBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceIntentBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    orientationBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    orientationDoneBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
       finished: fields.bool(o),
    }), optional: true},
    campusIdBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    emailSetUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    housingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    scholarshipBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceHousingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    housingReminderBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceNotAttendingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceNotSureBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceNotSureFollowUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    fafsaFollowUpTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    acceptFinAidBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    finAidFollowUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    intentFinalReminderBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    newStudentOrientationBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    pounceWaveTwoIntroduction: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    parkingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    fafsaIntroWaveTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    orientationFollowUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    registerDontAttendBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    weekBeforeOrientationBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    intentFollowUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    notAttendingSurveyBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    tuitionFeesPaidBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    mealPlanNudgeBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    aidOrientationDayOneCaseOneBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    aidOrientationDayOneCaseTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    aidOrientationDayOneIntroBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    aidOrientationDayTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    preEnrollmentDayThreeBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    acceptingLoansOneBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    acceptingLoansTwoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    acceptingLoansThreeBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    gapInAidBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    studentBelongingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    filterBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    senseOfBelongingFollowUpBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    gaugeBelongingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    supplementalBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    unknownUserBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    gatherProfileInfoBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    fafsaNudgeBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    finalStudySurveyBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    finalStudySurveyAltBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    finalSenseBelongingBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    studyGroupFilterBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    earlyActionDeadlineHonorsBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    prospectFinAidBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    honorsPresScholarshipBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
    honorsCampusVisitBot: {type: new SimpleSchema({
      skip: fields.bool(o),
      started: fields.bool(o),
      finished: fields.bool(o),
    }), optional: true},
  }), optional: true},
  
  abGroup: {type: Number, optional: true, max: 1, min: 0, decimal: true}
});

BrandedUserProfiles = new Mongo.Collection('brandedUserProfiles');
BrandedUserProfiles.attachSchema(BrandedUserSchema)