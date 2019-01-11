var o = {optional: true}

GeorgiaSchema = {type: new SimpleSchema({
  hopeAwardAmount: fields.string(o),
  hopeAwardDate: fields.date(o),
  hopeGSFAppSubmitted: fields.date(o),
  successAcademy: {type: new SimpleSchema({
    qualified: fields.bool(o),
    appReceived: fields.bool(o),
    accepted: fields.bool(o)
  }), optional: true}
}), optional: true}

BrandedUserSchema = new SimpleSchema({
  '_id': {optional: true, type: null},
  userId: fields.string(),
  crmId: fields.string({optional: false}), // gsu unique id
  abGroup: {type: Number, optional: true, max: 1, min: 0, decimal: true},
  application: {type: new SimpleSchema({
    status: fields.string(o),
    id: fields.string(o),
    decisionType: fields.string(o),
    missingDocuments: fields.bool(o),
    statusExtended: fields.string(o),
    receivedHSTranscript: fields.bool(o),
    appCompleteDate: fields.date(o),
    decisionDate: fields.date(o),
    applicationType: fields.string(o)
  }), optional: true},
  created: fields.date(),
  collegeName: fields.string(o),
  college: fields.string(o),
  collegeId: fields.string({optional: false}),
  control: fields.bool(o),
  dob: fields.date(o),
  email: fields.string(o),
  enrollmentId: fields.string(o), //pantherId for gsu
  entryTerm: fields.string(o),
  entryYear: fields.number(o),
  facebookId: fields.string(o),
  facebookOptIn: fields.bool(o),
  finAid: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o),
    finAidComplete: fields.bool(o),
    fafsaComplete: fields.bool(o),
    finAidInterest: fields.bool(o),
    scholarshipAwarded: fields.bool(o),
    scholarshipAccepted: fields.bool(o),
    acceptedOfferInternal: fields.bool(o),
    offered: fields.bool(o),
    entranceCounselingComplete: fields.bool(o),
    mpnPerkinsComplete: fields.bool(o),
    mpnStaffordPlusComplete: fields.bool(o),
    acceptedFedLoan: fields.bool(o),
    aidGap: fields.string(o),
    fafsaVerificationFlagDate: fields.date(o),
    fedLoanOffered: fields.bool(o),
    pellAwardAmount: fields.string(o),
    pellAwardDate: fields.date(o),
    workstudyAmount: fields.string(o),
    workstudtAwardDate: fields.date(o)
  }), optional: true},
  georgia: GeorgiaSchema,
  housing: {type: new SimpleSchema({
    onCampus: fields.bool(o),
    preferenceType: fields.preference_type(o),
    depositPaid: fields.bool(o),
    depositDate: fields.date(o)
  }), optional: true},
  importData: {
    type: Object,
    blackbox: true,
    defaultValue: {},
    optional: true
  },
  importSegmentLabels: {type: [String], optional: true, defaultValue: []},
  inStateStudent: fields.bool(o),
  intent: {type: new SimpleSchema({
    intendsToEnroll: fields.bool(o),
    intentReceivedDate: fields.date(o),
    counselorCanContact: fields.bool(o)
  }), optional: true},
  interest: {type: new SimpleSchema({
    crm: fields.number({min: 0, max: 5, optional: true})
  }), optional: true},
  knownUser: {type: Boolean, optional: true},
  _testUser: {type: Boolean, optional: true},
  lastIntegrationDate: fields.date(o),
  location: {type: new SimpleSchema({
    address1: fields.address(o),
    address2: fields.address(o),
    address3: fields.address(o),
    city: fields.string(o),
    county: fields.string(o),
    state: fields.state(o),
    zip: fields.zip_code(_.extend(o)),
    country: fields.string(o)
  }), optional: true},
  meta: {
    type: Object,
    blackbox: true,
    optional: true
  },
  name: {type: new SimpleSchema({
    first: fields.string(o),
    last: fields.string(o),
    middleName: fields.string(o),
    full: fields.string(o),
    nickName: fields.string(o)
  }), optional: true},
  orientation: {type: new SimpleSchema({
    needsToRsvp: fields.bool(o),
    attended: fields.bool(o),
    attendedDate: fields.date(o),
    registeredDate: fields.date(o)
  }), optional: true},
  permittedUser: fields.bool(o),
  phone: fields.string(o),
  presumedState: {type: new SimpleSchema({
    fafsaReceived: fields.bool(o), // finAid.fafsaReceived /
    finAidComplete: fields.bool(o), // finAid.finAidComplete /
    housingDepositPaid: fields.bool(o), // housing.depositPaid /
    orientationAttendedDate: fields.date(o), // orientation.attendedDate /
    orientationNeedsToRsvp: fields.bool(o), // orientation.needsToRsvp /
    intendsToEnroll: fields.bool(o) // intent.intendsToEnroll /
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
    honors: fields.bool(o),
    hsCode: fields.string(o),
    intendedCollege: fields.string(o),
    majorInterest: fields.string(o),
    residency: fields.string(o),
    honorsProspect: fields.bool(o),
    firstGen: fields.bool(o)
  }), optional: true},
  scholarBot: {type: Object, blackbox: true, optional: true},
  smsInfo: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  schoolEmail: fields.email(o),
  studyGroupMember: fields.bool(o),
  supplemental: {type: new SimpleSchema({
    first: fields.string(o),
    second: fields.string(o),
    third: fields.string(o),
    fourth: fields.string(o),
    fifth: fields.string(o)
  }), optional: true},
  tests: {type: new SimpleSchema({
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
    actLangaugeConvention: fields.act_composite_score(o)
  }), optional: true},
  textSetting: {type: new SimpleSchema({
    canText: fields.bool(o),
    wrongNumber: fields.bool(o), // moved to user doc
    newPhone: fields.phone_number(o)
  }), optional: true},
  tuiton: {type: new SimpleSchema({
    paymentPlan: fields.bool(o)
  }), optional: true},
  withdrawalReason: fields.string(o),
  _aidLastPush: {type: new SimpleSchema({ // all internal._aidLast
    planSubmitFafsa: fields.bool(o), // all internal._aidLast
    helpCompletingFafsa: fields.string(o), // all internal._aidLast
    planAttendOrientation: fields.bool(o), // all internal._aidLast
    allSetHousing: fields.bool(o), // all internal._aidLast
    unableToMakePayment: fields.bool(o) // all internal._aidLast
  }), optional: true},
  _contactSettings: {type: new SimpleSchema({
    canMessageGeneral: fields.bool(o),
    canMessageFacebook: fields.bool(o),
    canText: fields.bool(o),
    canTextLastModified: fields.date(o),
    softStopLastEntered: fields.date(o),
    contacted: fields.bool(o),
    finished: fields.bool(o),
    generalOptIn: fields.bool(o),
    nonWorkingFacebookId: fields.bool(o),
    nonWorkingNumber: fields.bool(o),
    twilioCode: fields.number(o),
    permittedUser: fields.bool(o),
    wrongNumber: fields.bool(o),
    twilioLookUpValid: fields.bool(o),
    passiveOptOut: fields.bool(o),
    carrier: fields.string(o)
  }), optional: true},
  _custom: {
    type: Object,
    blackbox: true,
    optional: true
  },
  _dialog: {type: Object, blackbox: true, optional: true},
  _dialogStack: {type: [Object], blackbox: true, optional: true},
  _facebookId: {type: String, optional: true},
  _finAid: {type: new SimpleSchema({
    finAidInterest: fields.bool(o),
    gapInAid: fields.bool(o), // _internal.gapInAid
    needHelpPaying: fields.bool(o) // _internal.needHelpPaying
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
    actLangaugeConvention: fields.act_composite_score(o)
  }), optional: true},
  _general: {type: new SimpleSchema({
    secondGroup: fields.bool(o), // internal.secondGroup
    whyNotTexting: fields.string(o) // internal.whyNotTexting
  }), optional: true},
  _housing: {type: new SimpleSchema({
    intention: fields.string(o) // _internal.housingResponse
  }), optional: true},
  _intent: {type: new SimpleSchema({
    alreadySubmitted: fields.bool(o), // new
    coming: {type: new SimpleSchema({
      reasonCode: fields.number(o),
      secondChoiceSchool: fields.string(o),
      secondChoiceState: fields.string(o)
    }), optional: true},
    date: fields.date(o), // internal.intentDate
    followUpIntent: fields.attending(o), // internal./followUpIntent
    goingInstead: fields.long_string(o), // internal.goingInstead
    howSolid: fields.string(o), // internal.howSolid
    intendsToEnroll: fields.bool(o),
    notComing: {type: new SimpleSchema({
      firstChoiceSchool: fields.string(o),
      firstChoiceState: fields.string(o),
      reasonCode: fields.number(o)
    }), optional: true},
    unsure: fields.bool(o), // internal.intentUnsure todo - mark this in unsure questions
    whyHere: fields.long_string(o), // internal.whyHere
    whyNoCollege: fields.string(o), // internal.whyNoCollege
    whyNotAttending: fields.long_string(o), // internal.whyNotAttending
    whyNotAttendingExtended: fields.long_string(o), // internal.whyNotAttendingExtended
    whyUnsure: fields.string(o), // was internal.whyUnsure
    whyUnsureExtended: fields.long_string(o) // was internal.whyUnsureExtended
  }), optional: true},
  _lastContacted: fields.date(o),
  _lastMessageId: fields.string(o),
  _lastTransport: fields.string(o),
  _oneOff: {
    type: Object,
    blackbox: true,
    optional: true
  },
  _orientation: {type: new SimpleSchema({
    best: fields.string(o), // internal.orienation.best
    experience: fields.string(o), // internal.orientation.experience.best
    experienceExtended: fields.long_string(o), // internal.orientation.experienceExtended.best
    stoodOut: fields.long_string(o), // internal.orientation.stoodOut
    improvement: fields.long_string(o), // internal.orientation.improvement
    willYouAttend: fields.string(o), // internal.orientation.willYouAttend
    registered: fields.bool(o) // internal.registeredOrientation
  }), optional: true},
  _parking: {type: new SimpleSchema({
    bringCar: fields.bool(o) // _internal.needsParking
  }), optional: true},
  _phone: fields.string(o),
  _previousPhone: fields.string(o),
  _profile: {type: new SimpleSchema({
    description: fields.profile_description(o),
    parent: fields.bool(o),
    plannedApplication: fields.planned_application(o),
    setCanTextFalse: fields.bool(o)
  }), optional: true},
  _responseBlackBox: {
    type: Object,
    blackbox: true,
    optional: true
  }
});

BrandedUserProfiles = new Mongo.Collection('brandedUserProfiles')
BrandedUserProfiles.attachSchema(BrandedUserSchema)

BrandedUserProfiles.before.update((userId, doc, fieldNames, modifier) => {
  if (modifier.$set && modifier.$set['_contactSettings.canText'] !== undefined) {
    modifier.$set['_contactSettings.canTextLastModified'] = new Date()
  }
});

BrandedUserProfiles.after.update((userId, newDoc) => {
  const oldDoc = this.previous;
  if ((_.get(oldDoc, '_dialog._id') !== 'defaultSoftStop') && (_.get(newDoc, '_dialog._id') === 'defaultSoftStop')) {
    BrandedUserProfiles.directUpdate({_id: newDoc._id}, {$set: {'_contactSettings.softStopLastEntered': new Date()}})
  }
});