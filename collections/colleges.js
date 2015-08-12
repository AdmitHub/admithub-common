var _totalPercentSplit = new SimpleSchema({
  total: {type: Number, optional: true},
  percent: fields.percent({optional: true})
});

var _aidMet = new SimpleSchema({
  "applicants": {type: _totalPercentSplit},
  "foundToHaveNeed": {type: _totalPercentSplit},
  "receivedAid": {type: _totalPercentSplit},
  "needFullyMet": {type: _totalPercentSplit},
  "averagePercentOfNeedMet": fields.percent({optional: true}),
  "averageAward": {type: Number, decimal: true, optional: true},
  "meritBasedGift": {type: Object},
  "meritBasedGift.total": {type: Number, optional: true},
  "meritBasedGift.percent": fields.percent({optional: true}),
  "meritBasedGift.averageAward": {type: Number, decimal: true, optional: true}
});

var _specificRange = new SimpleSchema({
  "lowRange": {type: Number, decimal: true, optional: true},
  "highRange": {type: Number, decimal: true, optional: true},
  "percentageOfFreshmen": fields.percent({optional: true}),
});
var _specificScoreData = new SimpleSchema({
  "average": {type: Number, decimal: true, optional: true},
  "range1": {type: _specificRange, optional: true},
  "range2": {type: _specificRange, optional: true},
  "range3": {type: _specificRange, optional: true},
  "range4": {type: _specificRange, optional: true},
  "range5": {type: _specificRange, optional: true},
  "range6": {type: _specificRange, optional: true},
});
var _specificCourseData = new SimpleSchema({
  "requiredUnits": {type: Number, optional: true, decimal: true},
  "recommendedUnits": {type: Number, optional: true, decimal: true}
});

var _testRange = new SimpleSchema({
  "average": {type: Number, decimal: true, optional: true},
  "halfClassRange": {type: Object},
  "halfClassRange.low": {type: Number, decimal: true, optional: true},
  "halfClassRange.high": {type: Number, decimal: true, optional: true}
});

CollegeSchema = new SimpleSchema({
  "idNumber": {type: Number},
  "name": {type: String},
  "slug": {type: String, regEx: /^[-a-z0-9]+$/, unique: true},
  "city": {type: String},
  "state": fields.state_or_province(),
  "country": {type: String},
  "region": {type: String, optional: true},
  "weather": {type: String},
  "website": fields.url({optional: true}),
  "schoolType": {type: String},
  "gender": {type: String, allowedValues: ["Men", "Women", "coed"], optional: true},
  "population": {type: Number, decimal: true, optional: true},
  "linkedinLink": fields.url({optional: true}),
  "hashtag": {type: String},

  "women": {type: _totalPercentSplit},
  "men": {type: _totalPercentSplit},

  "military": {type: Boolean, defaultValue: false},
  "historicallyBlack": {type: Boolean, defaultValue: false},

  "campusSetting": {type: Object},
  "campusSetting.localPopulation": {type: Number, optional: true},
  "campusSetting.environment": {type: String, optional: true},
  "campusSetting.nearestMetropolitanArea": {type: String, optional: true},
  "campusSetting.averageLowTempJanuary": {type: Number, optional: true, decimal: true},
  "campusSetting.averageHighTempSeptember": {type: Number, optional: true, decimal: true},
  "campusSetting.rainyDaysPerYear": {type: Number, decimal: true, optional: true},
  "campusSetting.linkToCampusMap": fields.url({optional: true}),
  "campusSetting.nearestAirport": {type: String, optional: true},
  "campusSetting.nearestBusStation": {type: String, optional: true},
  "campusSetting.nearestTrainStation": {type: String, optional: true},

  "campusSetting.housing": {type: Object},
  "campusSetting.housing.types": {type: [String], optional: true},
  "campusSetting.housing.freshmenGuarantee": {type: String, optional: true},
  "campusSetting.housing.studentsInCollegeHousing": {type: String, optional: true},
  "campusSetting.housing.percentOfStudentsCommuting": fields.percent({optional: true}),
  "campusSetting.housing.requirements": {type: String, optional: true},

  "campusSetting.sports": {type: Object},
  "campusSetting.sports.athleticConferences": {type: String, optional: true},
  "campusSetting.sports.mascot": {type: String, optional: true},
  "campusSetting.sports.varsitySportsOffered": {type: Object, optional: true},
  "campusSetting.sports.varsitySportsOffered.mens": {type: [String], optional: true},
  "campusSetting.sports.varsitySportsOffered.womens": {type: [String], optional: true},
  "campusSetting.sports.sportsScholarshipsGiven.mens": {type: [String], optional: true},
  "campusSetting.sports.sportsScholarshipsGiven.womens": {type: [String], optional: true},

  "campusSetting.popularActivitiesAndOrganizations": {type: [String], optional: true},

  "campusSetting.greekLife": {type: Object},
  "campusSetting.greekLife.percentofWomenInSororities": fields.percent({optional: true}),
  "campusSetting.greekLife.percentOfMenInFraternities": fields.percent({optional: true}),

  "campusSetting.ROTC": {type: String, optional: true},

  "generalAdmissionsData": {type: Object},
  "generalAdmissionsData.difficulty": {type: String, optional: true},
  "generalAdmissionsData.acceptanceRate": {type: _totalPercentSplit},
  "generalAdmissionsData.earlyAction": {type: Boolean, optional: true},
  "generalAdmissionsData.earlyDecision": {type: Boolean, optional: true},
  "generalAdmissionsData.regularDeadline": {type: String, optional: true},

  "generalAdmissionsData.SATMath": {type: _testRange},
  "generalAdmissionsData.SATReading": {type: _testRange},
  "generalAdmissionsData.SATWriting": {type: _testRange},
  "generalAdmissionsData.SATComposite": {type: _testRange}, // calculated from others
  "generalAdmissionsData.ACTComposite": {type: _testRange},

  "tuition": {type: Object},

  "tuition.costOfAttendance": {type: Object},
  "tuition.costOfAttendance.totalCost": {type: Object},
  "tuition.costOfAttendance.totalCost.general": {type: Number, optional: true},
  "tuition.costOfAttendance.totalCost.inState": {type: Number, optional: true},
  "tuition.costOfAttendance.totalCost.outOfState": {type: Number, optional: true},
  "tuition.costOfAttendance.tuition.general": {type: Number, optional: true},
  "tuition.costOfAttendance.tuition.inState": {type: Number, optional: true},
  "tuition.costOfAttendance.tuition.outOfState": {type: Number, optional: true},
  "tuition.costOfAttendance.inStateTuition": {type: Number, optional: true},
  "tuition.costOfAttendance.outOfStateTuition": {type: Number, optional: true},
  "tuition.costOfAttendance.roomAndBoard": {type: Number, optional: true},
  "tuition.costOfAttendance.booksAndSupplies": {type: Number, optional: true},
  "tuition.costOfAttendance.otherExpenses": {type: Number, optional: true},
  "tuition.costOfAttendance.averageGraduateDebt": {type: Number, optional: true},

  "tuition.financialAid": {type: Object},
  "tuition.financialAid.emailContact": fields.email({optional: true}),
  "tuition.financialAid.netPriceCalculator": fields.url({optional: true}),
  "tuition.financialAid.website": {type: String, optional: true},
  "tuition.financialAid.applicationDeadline": {type: String, optional: true},
  "tuition.financialAid.awardDate": {type: String, optional: true},
  "tuition.financialAid.FAFSACode": {type: String, optional: true},
  "tuition.financialAid.freshmen": {type: _aidMet},
  "tuition.financialAid.allUndergraduates": {type: _aidMet},

  "tuition.financialAid.borrowing": {type: Object},
  "tuition.financialAid.borrowing.percentOfGraduatesWithLoans": fields.percent({optional: true}),
  "tuition.financialAid.borrowing.averageIndebtednessOfGraduates": {type: Number, decimal: true, optional: true},

  "tuition.tuitionAndFees": {type: Number, decimal: true, optional: true},
  "tuition.roomAndBoard": {type: Number, decimal: true, optional: true},
  "tuition.averageGraduateDebt": {type: Number, decimal: true, optional: true},

  "demographics": {type: [Object]},
  "demographics.$.race": {type: String, optional: true},
  "demographics.$.percentage": fields.percent({optional: true}),

  "percentInternationalStudents": fields.percent({optional: true}),
  "averageStudentAge": {type: Number, decimal: true, optional: true},

  "retention": {type: Object, optional: true},
  "retention.percentOfFirstYearStudentsReturning": fields.percent({optional: true}),
  "retention.percentOfGraduatesWithin4Years": fields.percent({optional: true}),
  "retention.percentOfGraduatesWithin5Years": fields.percent({optional: true}),
  "retention.percentOfGraduatesWithin6Years": fields.percent({optional: true}),

  "calculatedAdmissionsData": {type: Object, optional: true},
  "calculatedAdmissionsData.GPA": {type: Object, optional: true},
  "calculatedAdmissionsData.GPA.school": {type: String, optional: true},
  "calculatedAdmissionsData.GPA.acceptanceRatePercent": fields.percent({optional: true}),
  "calculatedAdmissionsData.GPA.scores": {type: _specificScoreData, optional: true},


  "calculatedAdmissionsData.SATComposite": {type: Object, optional: true},
  "calculatedAdmissionsData.SATComposite.school": {type: String, optional: true},
  "calculatedAdmissionsData.SATComposite.acceptanceRatePercent": fields.percent({optional: true}),
  "calculatedAdmissionsData.SATComposite.scores": {type: _specificScoreData, optional: true},

  "calculatedAdmissionsData.SATReading": {type: Object, optional: true},
  "calculatedAdmissionsData.SATReading.school": {type: String, optional: true},
  "calculatedAdmissionsData.SATReading.acceptanceRatePercent": fields.percent({optional: true}),
  "calculatedAdmissionsData.SATReading.scores": {type: _specificScoreData, optional: true},

  "calculatedAdmissionsData.SATWriting": {type: Object, optional: true},
  "calculatedAdmissionsData.SATWriting.school": {type: String, optional: true},
  "calculatedAdmissionsData.SATWriting.acceptanceRatePercent": fields.percent({optional: true}),
  "calculatedAdmissionsData.SATWriting.scores": {type: _specificScoreData, optional: true},

  "calculatedAdmissionsData.SATMath": {type: Object, optional: true},
  "calculatedAdmissionsData.SATMath.school": {type: String, optional: true},
  "calculatedAdmissionsData.SATMath.acceptanceRatePercent": fields.percent({optional: true}),
  "calculatedAdmissionsData.SATMath.scores": {type: _specificScoreData, optional: true},

  "specificAdmissionsData": {type: Object},
  "specificAdmissionsData.GPA": {type: _specificScoreData},
  "specificAdmissionsData.SATWriting": {type: _specificScoreData},
  "specificAdmissionsData.SATReading": {type: _specificScoreData},
  "specificAdmissionsData.SATMath": {type: _specificScoreData},
  "specificAdmissionsData.ACTComposite": {type: _specificScoreData},

  "specificAdmissionsData.courses": {type: Object},
  "specificAdmissionsData.courses.english": {type: _specificCourseData},
  "specificAdmissionsData.courses.mathematics": {type: _specificCourseData},
  "specificAdmissionsData.courses.science": {type: _specificCourseData},
  "specificAdmissionsData.courses.foreignLanguage": {type: _specificCourseData},
  "specificAdmissionsData.courses.socialStudies": {type: _specificCourseData},
  "specificAdmissionsData.courses.history": {type: _specificCourseData},
  "specificAdmissionsData.courses.electives": {type: _specificCourseData},

  "specificAdmissionsData.testing": {type: Object},
  "specificAdmissionsData.testing.SATorACT": {type: Object},
  "specificAdmissionsData.testing.SATorACT.required": {type: Boolean, optional: true},
  "specificAdmissionsData.testing.SATorACT.scoresMustBeReceivedBy": {type: String, optional: true},

  "specificAdmissionsData.applying": {type: Object},
  "specificAdmissionsData.applying.address": {type: String, optional: true},
  "specificAdmissionsData.applying.phone": {type: String, optional: true},
  "specificAdmissionsData.applying.fax": {type: String, optional: true},
  "specificAdmissionsData.applying.email": fields.email({optional: true}),
  "specificAdmissionsData.applying.applicationFee": {type: String, optional: true},
  "specificAdmissionsData.applying.feeWaiverAvailable": {type: String, optional: true},
  "specificAdmissionsData.applying.deferOption": {type: String, optional: true},

  "specificAdmissionsData.applying.earlyDecision": {type: Object},
  "specificAdmissionsData.applying.earlyDecision.offered": {type: Boolean, optional: true},
  "specificAdmissionsData.applying.earlyDecision.deadline": {type: String, optional: true},
  "specificAdmissionsData.applying.earlyDecision.notification": {type: String, optional: true},

  "specificAdmissionsData.applying.earlyAction": {type: Object},
  "specificAdmissionsData.applying.earlyAction.offered": {type: Boolean, optional: true},
  "specificAdmissionsData.applying.earlyAction.deadline": {type: String, optional: true},
  "specificAdmissionsData.applying.earlyAction.notification": {type: String, optional: true},

  "specificAdmissionsData.applying.commonApplication": {type: Object},
  "specificAdmissionsData.applying.commonApplication.accepted": {type: Boolean, optional: true},
  "specificAdmissionsData.applying.commonApplication.supplementRequired": {type: Boolean, optional: true},

  "specificAdmissionsData.applying.universalApp": {type: Boolean, optional: true},

  "specificAdmissionsData.applying.requirements": {type: Object},
  "specificAdmissionsData.applying.requirements.interview": {type: String, optional: true},
  "specificAdmissionsData.applying.requirements.personalStatement": {type: String, optional: true},
  "specificAdmissionsData.applying.requirements.numberOfRecLettersRequired": {type: Number, decimal: true, optional: true},
  "specificAdmissionsData.applying.requirements.other": {type: String, optional: true},
  "specificAdmissionsData.applying.requirements.financialNeedConsidered": {type: Boolean, optional: true},

  "undergraduateMajors": {type: [String], optional: true},
  "mostPopularMajors": {type: [String], optional: true},
  "studyAbroad": {type: Boolean, optional: true},
  "IBCreditsAccepted": {type: String, optional: true},
  "APCreditsAccepted": {type: String, optional: true},
  "sophomoreStanding": {type: String, optional: true},

  "coverPhoto": fields.url({optional: true}),
  "schoolLogo": fields.url({optional: true}),

  // Denormalized distances for aggregation queries
  "_distances": {type: Object, blackbox: true, optional: true},

  // Local to college-chooser (not present in collegeData)
  "partner": {type: Boolean, defaultValue: false}
});

Colleges = new Mongo.Collection("colleges");
CollegesInMemory = {};
Colleges.attachSchema(CollegeSchema);
if (Meteor.isServer) {
  Meteor.startup(function() {
    Colleges.find({}).forEach(function(college) {
      CollegesInMemory[college._id] = college;
    });
  });
}
