var o = {optional: true};

BrandedUserSchema = new SimpleSchema({
	"_id": {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
	crmId: fields.string({optional: false}), //gsu unique id
	created: fields.date(),
	enrollmentId: fields.string(o), //pantherId for gsu
	schoolEmail: fields.email(o),
	entryYear: fields.number(o),
	entryTerm: fields.string(o),
	name: {type: new SimpleSchema({
		first: fields.string(o),
		last: fields.string(o),
		middleInitial: fields.string(o),
		full: fields.string(o),
		nickName: fields.string(o),
	}),optional: true},
	phone: fields.phone_number(o),
	dob: fields.date(o),
	location: {type: new SimpleSchema({
		address1: fields.address(o),
		address2: fields.address(o),
		city: fields.string(o),
		state: fields.state(o),
		zip: fields.zip_code(_.extend(o)),
		country: fields.string(o),
	}), optional: true},
	inStateStudent: fields.bool(o),
	application: {type: new SimpleSchema({
		status: fields.string(o), 
	}), optional: true},
	profile: {type: new SimpleSchema({
		studentType: fields.string(o),
	}), optional: true},
	finAid: {type: new SimpleSchema({
		fafsaComplete: fields.bool(o),
		finAidInterest: fields.bool(o),
		scholarshipAwarded: fields.bool(o),
		scholarshipAccepted: fields.bool(o),
		missingEntryLoan: fields.bool(o),
		missingPromissoryLoan: fields.bool(o),
	}),optional: true},
	housing: {type: new SimpleSchema({
		onCampus: fields.bool(o),
		preferenceType: fields.string(o),
		depositPaid: fields.bool(o),
		depositDate: fields.bool(o),
	}),optional: true},
	orientation:{type: new SimpleSchema ({
		needsToRsvp: fields.bool(o),
		attended: fields.bool(o),
		attendedDate: fields.date(o),
		registeredDate: fields.date(o),
	}),optional: true},
	textSetting:{type: new SimpleSchema ({
		canText: fields.bool(o),
		softStop: fields.bool(o),
		hardStop: fields.bool(o),
	}), optional: true},
	interest: {type: new SimpleSchema({
		crm: fields.number({min: 0, max: 5, optional: true}),
		admithub: fields.number({min: 0, max: 5, optional: true}),
	}), optional: true},
	intent: {type: new SimpleSchema({
		intendsToEnroll: fields.bool(o),
		intentRecievedDate: fields.date(o),
	}), optional: true},
	initialBrandedSurvey: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  finAidWorkflow: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  orientationWorkflow: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  campusIdWorkflow: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  emailSetUpWorkflow: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  housingWorkflow: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
});

GeorgiaStateUsers = new Mongo.Collection('georgiaStateUsers');
GeorgiaStateUsers.attachSchema(BrandedUserSchema);