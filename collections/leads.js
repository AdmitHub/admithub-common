Leads = new Mongo.Collection('leads');

var o = {optional: true};

Leads.attachSchema({
  "firstName": fields.string(o),
  "lastName": fields.string(o),
  "email": fields.email({optional: false}),
  "createdAt": fields.created_date(o),
  "organization": fields.string(o)
});

