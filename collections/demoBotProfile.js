var o = {optional: true};

DemoBotProfileSchema = new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  createdAt: {type: Date},
  userId: {type: String, optional: true},
  "howCanIHelp": {type: String, max: 300, optional: true},
  "descriptionOfAdmitHub": {type: String, max: 300, optional: true},
  "recommend": {type: String, max: 200, optional: true},
  "evaluation": fields.demo_evaluation(o)
});

DemoBotProfiles = new Mongo.Collection('demoBotProfiles');
DemoBotProfiles.attachSchema(DemoBotProfileSchema);
