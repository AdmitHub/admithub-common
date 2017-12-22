# admithub-common
Common styles, templates, and library functions and classes for AdmitHub apps

## Schema

### BrandedApplicantConversations
Records the history of email exchanges between student user and instution.
Fields:
  - `applicantId` Type: String. Required. **Deprecated**. This was the `_id` on the `brandedApplicants` document corresponding to the user. it is now identical to the `userId` -- i.e., it is the `_id` of the `brandedUserProfile` document of the relevant student user. I think it is non-functional. (To do: eliminate this.)
  - `messages`: Type: \[Object\]. Required. An array containing object that record information about the messages exchanges between the student user and the institution. Subfields:
    - `body` Type: String. Required. The text of the message.
    - `created` Type: Date. Required. Date the message was created. (To do: change name to `createdAt`.)
    - `sender` Type: String. Required. Allowed values: `student`, `college`, `admithub`. Indicates the source of the message.
    - `auto` Type: Boolean. Optional. Indicates whether the email was auto-generated becaue of the topic returned by Holocene. (To do: make this required.)
    - `email` Type: String. Optional. The email address at the institution to which the email was sent, or from which it was received. (To do: make this required.)
    - `logId` Type: String. Optional. According to a comment in the code, this is non-functional; I speculate that it is intended to record the ai-log associated with an auto-generated email. (To do: either make this functional or get rid of it.)
    - `unverified` Type: Boolean. Optional. Set as `true` on all emails received at the `/api/receiveEmail` endpoint. That includes all emails from an institution that respond to an auto-generated or triager-generated email. This is used to filter those messages that get sent as part of the body of an email forwarded to an institution. (To do: verify this is desired behaviour. If not, get rid of it.)
  - `brandedCollegeId`: Type: String. Optional. The `_id` of the `brandedCollege` document of the relevant institution. (To do: make this required, until we merge the `_id` and `messagingService` fields of the `brandedCollege` document, then either get rid of this one or `messaginService`.)
  - `created`: Type: Date. Optional. The date the document was created. (To do: change name to `createdAt` if this name isn't necessary for metabase. (A comment suggests it *is* necessary for metabase.) Make required.)
  - `handled` Type: Boolean. Optional. Default value: `false`. Indicates if the user interaction has been handled to completion or not (It think). Toggled in the UI. Used to filter messages that appear in the UI. (To do: make this required.)
  - `messagingService`: Type: String. Optional. The `messagingService` field on the relevant institutions `brandedUserProfile` document. (To do: make this required. And see `brandedCollegeId`.)
  - `userId`: Type: String. Optional. The `_id` of the `brandedUserProfile` document of the relevant student user. (To do: make this required.)

### BrandedCollegeApplicants
**Deprecated**. Some kind of pre `brandedUserProfile` user document.

### BrandedColleges
Documents containing details about partner institutions.
Fields:
 - `aiSubject` Type: String. Required. A string used as part of the input contexts passed to Holocene calls.
 - `disabledFeatures` Type: \[String\]. Required. Default value: empty array. Front-end uses this to determine what opt-out features the insitution dis not have access to. (To do: see `enabledFeatures`.)
 - `messagingService`: Type: String. Required. Name of the messaging service of the institution. (To do: make only one of this and `_id` exist.)
 - `name` Type: String. Required. Full name of the institution.
 - `oliName` Type: String. Required. Name of the bot personality. (To do: consider changing name. Though maybe we want to keep it for nostalgia resons.)
 - `abbr` Type: String. Optional. Abbreviated form of the institution's name.
 - `animal` Type: String. Optional. The species (or whatever) of the institution's mascot.
 - `collection` **Deprecated** Type: String. Optional. The collection of user documents associated with the institution. (To do: get rid of this, unless we decide we do want to use seperate collections after all.)
 - `collegeId` **Deprecated** Type: String. Optional. Regex: Simple-schema style id. What used to be the id of the institution in the `college` documents. (To do: get rid of this.)
 - `counselors` Type: \[Object\]. Optional. Default value: empty array. Blackbox. *I think* a list of counselors. If so, this is **deprecated**. (To do: confirm usage, and probably get rid of it. Also, no need for default value. Also, eliminate black boxes, if possible.)
 - `csvTransformPipeline` Type: \[String\] Optional. Default value: empty array. Strings are code in mini-language used to transform csv file data before it's given to the upload function. (To do: remove default value.)
 - `dateAccepted` Type: String. Optional. The date by which acceptance decisions are announced by the institution. (To do: think about if we should have fields like this. We can use them in templating for cross-institutional dialogs, but the common practice seems to be to make dialogs that need this sort of thing ad hoc for each instution, so these don't get used much. This particular one, for instance, doesn't exist on any current `brandedUserProfile` document. Also, I think we should encourage the ad-hoc dialog creation, because it is something partner institutions can do themselves.)
 - `dateScholarship` Type: String. Optional. Unclear; either the date by which scholarship decisions are made, or the date by which scholarship applications are due. (To do: see `dateAccepted`.)
 - `departments` Type: \[Object\]. Optional. Default value: empty array. Blackbox. *I think* a list of information concerning the schools departments. (To do: remove default value, eliminate blackbox. Determine usage. Possibly eliminate.)
 - `dialogSettings` Type: Object. Optional. Settings used to control behaviour around the dialog returned to users. (To do: make this required.) Subfields:
   - `botOffDialog` Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users when the bot is otherwise non-functional (in the event that we want there to be such a dialog).
   - `botOffNoDialog` Type: Boolean. Optional. Return no dialog under any circumstances, if value is `true`; bot is non-functional. (To do: consider changing name; the symmetry with `botOffDialog` suggests this should be a string. But I can't think of a great alternative.)
   - `createAndIntroDialog`: Type: String. Optional
   - `knownNonContactedStudentDialog`: Type: String. Optional. Field not currently in use. Originally intended for a sub-case of the cases where `unknownStudentDialogBotOn` are used: specifically those students who have yet to have interacted with the system, but are known to the system via import. We can in the future distinguish that case from the completely unknown case, if we want.
   - `unknownStudentDialogBotOff`: Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users who have been deliberately barred from the system, which by default is all unknown users for a closed bot. If this field doesn't exist, users are sent `filterBot` in those circumstances. (To do: change name.)
   - `unknownStudentDialogBotOn` Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users if they intitate a conversation without ever having interacted with the bot. If this field does not exist, the user is, in those circumstances, sent `defaultUnknownStudentDialogBotOn` (To do: change the name.)
   - `finishedConversationDialog` Type: String. Optional. *I think* this was intended for users who, for whatever reason, we've decided we for users we don't want to talk to any further, like users who have identified as parents. It's the `_id` on the `dialog` of the intended dialog. (To do: confirm use case; if confirmed, remove either this or `unknownStudentDialogBotOff`; this seems to replicate functionality.)
 - `emailPrefix` Type: String. Optional. **Deprecated** Used in some way in the old Oli matching system. (To do: get rid of it.)
 - `enabledFeatures`. Type: \[String\]. Optional. Default value: empty array. Used on the front end to determine which opt-in features the institution has access to. (Either make this required, or make `disabledFeatues` optional. If this field is left optional, remove default value.)
 - `facebookId`: Type: String. Optional. The id of the facebook page using our facebook app that is associated with the institution.
 - `filterOn` Type: Boolean. Optional. The field that distinguished open bots (value `false`) from closed bots (value `true`). (To do: move this to `dialogSettings`. Make required.)
 - `hashtag` Type: String. Optional. The hashtag used for social media campaigns. (To do: see `dateAccepted`.)
 - `infoGatheringBot` Type: String. Optional. Dialog scheduled after the initial dialog in an open bot. (To do: move this to `dialogSettings`.
 - `intentDeadline` Type: Date. Optional. Deadline by which students must fill intent-to-enroll paperwork. (To do: see `dateAccepted`.)
 - `internalFieldMapping`: Type: Object. Optional. Default value: empty object. Blackbox. Maps csv column headings to fields on our documents. (To do: un-black-box. Either make required or take away default value.)
 - `introKnownProspectBotPhoto` Type: String. Optional. Default value: empty string. Url of a photo used in the (not currently existing) `introKnownProspectBot` dialog. (To do: see `dateAccepted`. Also, there's no reason to have a default value here for an optional field.)
 - `linkAcceptAid` Type: String. Optional. Link to website at which a student can accept financial aid from the institution. (To do: see `dateAccepted`.)
 - `linkAdmit` Type: String. Optional. A link admitted students use to see what next steps to take. (To do: see `dateAccepted`.)
 - `linkCounselors` Type: String. Optional. Link for students to learn more about the instution's counselors. Used in the old `filterBot`. (To do: add templating in `filterBot` to use this.)
 - `linkIncompleteApplication`: Type: String. Optional. Unclear; no current appearance in code or data. Presumably something a link for students to compelte an incomplete application. (To do: see `dateAccepted`.)
 - `linkFafsa` Type: String. Optional. Link to information about the FAFSA. (To do: see `dateAccepted`.)
 - `linkFinAid` Type: String. Optional. Link to information about the institutions financial aid. (To do: see `dateAccepted`.)
 - `linkIntentToEnroll` Type: String. Optional. Link to the institutions intent-to-enroll form. (To do: see `dateAccepted`.)
 - `linkOrientationChecklist` Type: String. Optional. Link to information about steps involved in orientation. (To do: see `dateAccepted`.)
 - `linkOrientationInfo` Type: String. Optional. Blah blah. (To do: see `dateAccepted`.)
 - `linkTourSignUp` Type: String. Optional. You get the idea. (To do: see `dateAccepted`.)
 - `linkVisitTips` Type: String. Optional. And again. (To do: see `dateAccepted`.)
 - `mediaCongrats` Type: String. Optional. Media used in dialog congratulation student on acceptance. (To do: see `dateAccepted`.)
 - `mediaMascot` Type: String. Optional. Media of the instutions mascot.
 - `messagingServiceSid` Type: String. Optional. A string used by Twilio to identify the messaging service of the institution.
 - `phoneFinAid` Type: String. Optional. Phone number to call at institution to learn about financial aid. (To do: see `dateAccepted`.)
 - `prependCounselorResponse`: Type: String. Optional. Prepends counselor response to emails, e.g. "Your officer replied to your question...". Not currently functional. (To do: make this functional. Have a default, so it's not required.)
 - `primaryBrandColor` Type: String. Optional. Primary colour representing the institution.
 - `promptFilter` Type: String. Optional. Apparently I added this, but I have no idea why, and it seems to be completely unfunctional. (To do; get rid of it.)
 - `studentFieldMapping` Type: Object. Optional. Default value: empty object. Blackbox. 
 - `tuitionDueDate` Type: Date. Optional. Date by which stuent tuition is due. (To do, see `dateAccepted`.)

### BrandedUserProfile
  User document for student users.
  - `crmId` type: String. Required. Identifier used specifically by gsu. (To do: make this optional.)
  - `userId` Type: String. Required. **Deprecated**. `_id` on the `user` document corresponding to the `brandedUserProfile`. There is no such document now; the `user`schema is reserved for Phoenix and Mascot users. This field is now identical to the `_id` field. (To do: get rid of this.)
  - `abGroup` Type: Number. Optional. Real number between 0 and 1, chosen at random; used for A/B testing. (To do: make this required.)
  - `application` Type: Object. Optional. Record information about the status of a user's application. This was added with Georgia State specifically in mind, and the subfields reflect the way Georgia State records information about their applicants. (To do: determine if we want to keep this field on the `brandedUserProfile` document, given it's specificty to GSU. If not, think about where to keep existing data, if we need to keep it anywhere.) Subfields:
    - `id` Type: String. Optional. Id used by institution to record the application information.
    - `status` Type: String. Optional. This is not enforced, but intended values are, in chronological order of progression, "Suspect", "Prospect", "Applicant: Incomplete", "Applicant: Complete", "Applicant: Success Academy", "Applicant: Defer", "Applicant: Denied", "Applicant: Withdrawn", "Admit", "Confirmed", "Enrolled". (To do: enforce this.)
    - `decisionType` Type: String. Optional. Not enforced, but intended values are "Early Action" and "Regular Decision" (perhaps others, but that's all I could find.) (To do: enforce.)
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
    contacted: fields.bool(o),
    finished: fields.bool(o),
    generalOptIn: fields.bool(o),
    nonWorkingNumber: fields.bool(o),
    nonWorkingNumberCode: fields.string(o),
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



## Monitoring and Metrics examples

```
require("babel-register");
require('source-map-support/register');

const publishers = require('./lib/monitoring/metric_publishers');

let publisher = new publishers.MetricPublisher({});

(async function() {
   let result = await publisher.publish(1.0);
   console.log("Metric publisher test complete");
})(); // This is called an "immediately invoked function" in javascript. Helps to avoid promises in interactive mode.


const monitors = require('./lib/monitoring/monitors');

let hbeat_monitor = new monitors.HeartbeatMonitor({});

(async function() {
   let result = await hbeat_monitor.beat();
   console.log("Heartbeat monitor test complete");
})();


let event_monitor = new monitors.EventMonitor({});

(async function() {
   let result = await event_monitor.recordEvent();
   console.log("Event monitor test complete");
})();
```
