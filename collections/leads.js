Leads = new Mongo.Collection('leads')

var o = {optional: true}

Leads.attachSchema(new SimpleSchema({
  'firstName': fields.string({optional: true, label: 'Your Name'}),
  'lastName': fields.string(o), // no longer using last name field, full name saved to firstName
  'title': fields.string({optional: true, label: 'Your Title'}),
  'email': fields.email({optional: false}),
  'phone': fields.phone_number({optional: true, label: 'Phone Number'}),
  'createdAt': fields.created_date(o),
  'organization': fields.string({optional: true, label: 'Institution Name'})
}))

