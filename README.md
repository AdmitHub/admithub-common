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
  - `collegeId` Type: String. Required. Value of `_id` field on the `BrandedCollege` document of the institution associated with the student.
  - `crmId` type: String. Required. Identifier used specifically by GSU. (To do: make this optional.)
  - `userId` Type: String. Required. **Deprecated**. `_id` on the `user` document corresponding to the `brandedUserProfile`. There is no such document now; the `user`schema is reserved for Phoenix and Mascot users. This field is now identical to the `_id` field. (To do: get rid of this.)
  - `created` Type: Date. Required. Date of creation of the user document. (To do: make this `createdAt` (or change the convention on other documents.))
  - `_testUser` Type: Boolean. Optional. Indicates that this is a test user.
  - `abGroup` Type: Number. Optional. Real number between 0 and 1, chosen at random; used for A/B testing. (To do: make this required.)
  - `application` Type: Object. Optional. Record information about the status of a user's application. Subfields:
    - `id` Type: String. Optional. Id used by institution to record the application information.
    - `appCompleteDate` Type: Date. Optional. Date the application was completed, if it was.
    - `applicationType` Type: String. Optional. Unclear meaning; no existing document has this field. (To do: see if this is still wanted, if not, get rid of it.)
    - `decisionDate` Type: Date. Optional. Date the institution made a decision about enrollment, if it did.
    - `decisionType` Type: String. Optional. Not enforced, but intended values are "Early Action" and "Regular Decision" (perhaps others, but that's all I could find.) (To do: enforce.)
    - `missingDocuments` Type: Boolean. Optional. Indicates if the student's application is missing any documents.
    - `receivedHSTranscript` Type: Boolean. Optional. Indicates if the institution has received the student's high school transcript.
    - `status` Type: String. Optional. This is not enforced, but intended values are, in chronological order of progression, "Suspect", "Prospect", "Applicant: Incomplete", "Applicant: Complete", "Applicant: Success Academy" (this is Georgia State specific), "Applicant: Defer", "Applicant: Denied", "Applicant: Withdrawn", "Admit", "Confirmed", "Enrolled". (To do: enforce this.)
    - `statusExtended` Type: String. Optional. Records further notes (further to the `status` field) on the status of the application. Example: `"Accept: Final No Letter"`.
  - `college` Type: String. Optional. Unclear intended usage; I think this is a duplicate field of `collegeName` or `collegeId`. No current document has this field. (To do: determine if this is needed, if not, get rid of it.)
  - `collegeName`: Type: String. Optional. Name of the institution associated with the student.
  - `dob`: Type: Date. Optional. Date of birth of the student.
  - `email`: Type: String. Optional. Email address of the student. (To do: enforce email-address syntax.)
  - `enrollmentId`: Type: String. Optional. Not totally clear; has some specific meaning for GSU (their "panther Id").
  - `entryTerm` Type: String. Optional. Term of student's enrollment in the institution. (To do: enforce intended values -- things like `Fall`, `Spring`).
  - `entryYear` Type: Number. Optional. Year of student's enrollment
  - `facebookId` Type: String. Optional. Facebook id of student.
  - `facebookOptIn` Type: Boolean. Optional. Indicates if student has opted in to receiving push messages on facebook. (To do: think about whether we should nest facebook related fields as sub-fields.
  - `finAid` Type: Object. Optional. Records information about the student's finanical aid status. Sub-fields:
    - `acceptedFedLoan` Type: Boolean. Optional. Indicates if the student has accepted a federal loan.
    - `acceptedOfferInternal` Type: Boolean. Optional. Unclear intended usage. No existing document has this field. (To do: determine if this is needed; if not get rid of it.)
    - `aidGap` Type: String. Optional. Unclear intended usage. No existing document has a non-null value for this field. (To do: determine if this is needed. If not, get rid of it.)
    - `entranceCounselingComplete` Type: Boolean. Optional. *I think* it's meant to indicate if the finanical aid office has counseled the student on their optionas.
    - `fafsaComplete` Type: Boolean. Optional. Indicates if the student's fafsa application is complete. (To do: determine if both this and `fafsaReceived` are needed.)
    - `fafsaReceived` Type: Boolean. Optional. Indicates if the student's fafsa application has been received.
    - `fafsaVerificationFlagDate`: Type: Date. Optional. I'm not sure what this is about; presumably something to do with the fafsa application process.
    - `fedLoanOffered` Type: Boolean. Optional. Indicates if a federal loan has been offered to the student.
    - `finAidComplete` Type: Boolean. Optional. Indicates if the student's application for insitutional finanical aid is complete.
    - `finAidInterest` Type: Boolean. Optional. Indicates if the student has expressed interest in receiving financial aid.
    - `offered`: Type: Boolean. Optional. Unclear intended usage. It's compatible with having `scholarshipAwarded: false`. (To do: determine what this is supposed to mean.)
    - `mpnPerkinsComplete` Type: Boolean. Optional. Indicates if the student has completed an application for the Federal Perkins Loan Master Promissory Note.
    - `mpnStaffordPlusComplete`. Type: Boolean. Optional. Indicates if the student has completed an application for the Stafford or PLUS federal loan.
    - `pellAwardAmount` TypeL String. Optional. I think this is supposed to indicate the amount of money the government granted the student with a Pell Grant, but there are no current documents with non-null values for this field.
    - `pellAwardDate` Type: Date. Optional. I *think* the date on which the government awarded the student a Pell Grant.
    - `scholarshipAccepted` Type: Boolean. Optional. Indicates if the student has accepted a scholarship from the institution.
    - `scholarshipAwarded` Type: Boolean. Optional. Indicates if the institution has awarded the student a scholarship.
    - `workstudyAmount` Type: String. Optional. I think it is supposed to indicate the amoutn of money the students gets via the Federal Work Study program.
    - `workstudtAwardDate` Type: Date. Optional. Presumably the date on thich the Student was accepted into the Work Study program. (To do: correct the typo.)
  - `georgia` Type: Object. Optional. Set of Georgia State-specific fields. Subfields:
    - `hopeAwardAmount` Type: String. Optional. Presumably the amount of money GSU awarded the student with a HOPE scholarship.
    - `hopeAwardDate` Type: Date. Optional. Date on which GSU awarded the student a HOPE scholarship.
    - `hopeGSFAppSubmitted` Type: Date. Optional. Unclear; something to do with a Georgia based scholarsip called `GSF` and Georgia State University's own HOPE scholarship.
    - `successAcademy`: Type: Object. Optional. Contains information about the student's relationship to GSU's Success Academy. Subfields:
      - `accepted` Type: Boolean. Optional. Indicates if the Success Academy accepted the student's application.
      - `appReceived` Type: Boolean. Optional. Indicates if GSU has received an application to the Success Academy from the student.
      - `qualified` Type: Boolean. Optional. Indicates if the student is qualified to enroll in the Success Academy.
  - `housing`: Type: Object. Optional. Contains information about the student's accomodation. Subfields:
    - `depositDate` Type: Date. Optional. Unclear if this is intended to be the sate the deposit must be payed *by* or the date it in fact was paid *on*. (To do: determine the intended usage of this field.)
    - `depositPaid` Type: Boolean. Optional. Indicates whether or not a student has paid a deposit for their housing.
    - `onCampus` Type: Boolean. Optional. Indicates student lives on campus.
    - `preferenceType` Type: String. Optional. Allowed values: 'Residence hall', 'Off-campus', 'Parents', 'Married housing', 'Fraternity/Sorority'. Indicates the preffered living arrangment of the student.
  - `importData` Type: Object. Optional. Default value: empty object. Black-box. Used by astronomer and the brookline user creation endpoint for any unmapped data. (To do: determine if there is any need for this default value.)
  - `importSegmentLabels` Type: \[String\]. Optional. Default value: empty array. List of labels used to identify a batch of students imported on a single occasion. For each time the student is imported, there is a string in the `importSegmentLabels` array, and vice-versa.
  - `inStateStudent` Type: Boolean. Optional. Indicates if the student counts as "in-state" for the purposes of enrollment and tuition.
  - `intent` Type: Object. Optional. Contains information concerning a propsective students intent to enroll. Subfields:
    - `intentReceivedDate`Type: Date. Optional. Indicates date at which the institution received some kind of formal statement of intent to enroll from the student.
    - `intendsToEnroll` Type: Boolean. Optional. Indicates whether or not the student intends to enroll (presumably as indicated in the aforementioned formal way.)
    - `counselorCanContact` Type: Boolean. Optional. Indicates if it is ok for a counselor to initiate contact with the student; I'm not sure how this is determined.
 - `interest` Object. Optional. Unclear what the intended usage is here. Has exactly one subfield:
   - `crm` Type: Number. Optional. Allowed values: `1` through `5`. I don't know what this means. (To do: figure out if this is needed. If not get rid of it. Also: figure out why this isn't on the top level; if there isn't a reason, move it.)
 - `knownUser` Type: Boolean. Optional. Indicates the user is known to the system. The only users who will not have `knownUser: true` are users that are communicating with the bot cold. It is possible to be `knownUser: true` before any communication occurs if, for example, the student data was imported.
 - `lastIntegrationDate` Type: Date. Optional. Indicates the last date on which user data was integrated into the system via Astronomer. (To do: determine if all astronomer-related stuff should be subfields of the one field.)
 - `location`: Type: Object. Optional. *I think* this is the contact address of the student. Subfields:
   - `address1` Type: String. Optional. First line of an address.
   - `address2` Type: String. Optional. Second line of the address, if there is one.
   - `address3` Type: String. Optional. Third line of the address, if there is one.
   - `city` Type: String. Optional. City part of the address.
   - `country` Type: String. Optional. Country of the address.
   - `county` Type: String. Optional. County part of the address, if there is one.
   - `state` Type: String. Optional. Regex constraint: `/^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/`. State.
   - `zip` Type: String. Optional. Zip code. (To do: consider changing the name if we're intending to use this for non-U.S. addresses.)
 - `meta` Type: Object. Optional. Black box. Contains a bunch of information recording the history of user interaction with the system. (To do: un-black-box this.)
 - `name` Type: Object. Optional. Contains information about the student's name. Subfields.
   - `first` Type: String. Optional. First name.
   - `last` Type: String. Optional. Last name.
   - `middleName` Type: String. Optional. Middle name.
   - `full` Type: String. Optional. Full name.
   - `nickName` Type: String. Optional. Nick name.
 - `orientation`Type: Object. Optional. Contains information about the students intention to attend orientation.
   - `attended` Type: Boolean. Optional. Indicates whether the student attended orientation or not.
   - `attendedDate` Type: Date. Optional. Date at which the student attended orientation.
   - `needsToRsvp` Type: Boolean. Optional. *I think* this indicates whether the student still needs to RSVP to the orientation invitation. (To do: give this a clearer name.)
   - `registeredDate` Type: Date. Optional. Date at which the student registered to attend orientation.
 - `permittedUser` Type: Boolean. Optional. Indicates if the user is permitted to interact with the bot.
 - `phone` fields.string(o),
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
