HsLeads = new Mongo.Collection('hsleads');

var o = {optional: true};

HsLeads.attachSchema(new SimpleSchema({
	"email": fields.email({optional: false}),
	"firstName": fields.string(o),
	"lastName": fields.string(o),
	"title": fields.string({optional: true, label: "Your Title"}), 
	"organization": fields.string({optional: true, label: "High School/CBO name"}),
	"city": fields.string(o),
	"state": fields.string(o),
	"schoolPopulation": fields.number(o),
	"createdAt": fields.created_date(o),
	"interestedIn": {type: new SimpleSchema({
  	"counselorDashboard": fields.bool(o),
  	"participateInForum": fields.bool(o),
  	"collegeFairManager": fields.bool(o),
  	"messagingWithStudents": fields.bool(o)
  }), optional: true}
}));