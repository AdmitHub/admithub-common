var o = {optional: true};

BrandedUserSchema = new SimpleSchema({
	userId: fields.string(),
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
		wrongNumber: fields.bool(o),
	}), optional: true},
	interest: {type: new SimpleSchema({
		crm: fields.number({min: 0, max: 5, optional: true}),
		admithub: fields.number({min: 0, max: 5, optional: true}),
	}), optional: true},
	intent: {type: new SimpleSchema({
		intendsToEnroll: fields.bool(o),
		intentRecievedDate: fields.date(o),
	}), optional: true},
	initialBrandedBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  finAidBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  orientationBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  campusIdBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  emailSetUpBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
  housingBot: {type: new SimpleSchema({
    skip: fields.bool(o),
    finished: fields.bool(o),
  }), optional: true},
});

GeorgiaStateUsers = new Mongo.Collection('georgiaStateUsers');
GeorgiaStateUsers.attachSchema(BrandedUserSchema);