var o = {optional: true};

BrandedUserSchema = new SimpleSchema({
	"_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
	crmId: fields.string({optional: false}), //gsu unique id
	created: fields.date(),
	enrollmentId: fields.string(o), //pantherId for gsu
	schoolEmail: fields.email(o),
	entryYear: fields.number(o),
	entryTerm: fields.string(o),
	name: {
		first: fields.string(o),
		last: fields.string(o),
		middleInitial: fields.string(o),
		full: fields.string(o),
		nickName: fields.string(o),
	},
	phone: fields.phone_number(o),
	dob: fields.date(o),
	location: {
		address1: fields.address(o),
		address2: fields.address(o),
		city: fields.string(o),
		state: fields.state(o),
		zip: fields.zip_code(_.extend(o)),
		country: fields.string(o),
	},
	inStateStudent: fields.bool(o),
	application: {
		status: fields.string(o), 
	},
	profile: {
		studentType: fields.string(o),
	},
	finAid: {
		fafsaComplete: fields.bool(o),
		finAidInterest: fields.bool(o),
		scholarshipAwarded: fields.bool(o),
		scholarshipAccepted: fields.bool(o),
		missingEntryLoan: fields.bool(o),
		missingPromissoryLoan: fields.bool(o),
	},
	housing: {
		onCampus: fields.bool(o),
		preferenceType: fields.string(o),
		depositPaid: fields.bool(o),
		depositDate: fields.bool(o),
	},
	orientation: {
		needsToRsvp: fields.bool(o),
		attended: fields.bool(o),
		attendedDate: fields.date(o),
		registeredDate: fields.date(o),
	},
	textSetting: {
		canText: fields.bool(o),
		softStop: fields.bool(o),
		hardStop: fields.bool(o),
	},
	interest: {
		crm: fields.number(o),
		admithub: fields.number(o),
	},
	intent: {
		intendsToEnroll: fields.bool(o),
		intentRecievedDate: fields.date(o),
	},
	initialSurvey: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	},
	finAidWorkflow: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	},
	orientationWorkflow: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	},
	campusIdWorkflow: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	},
	emailSetUpWorkflow: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	},
	housingWorkflow: {
		completed: fields.bool(o),
		skipped: fields.bool(o),
	}
});

GeorgiaStateUsers = new Mongo.Collection('georgiaStateUsers');
GeorgiaStateUsers.attachSchema(BrandedUserSchema);