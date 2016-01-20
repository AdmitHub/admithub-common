AIEntities = new Mongo.Collection("ai.entities");
AIEntities.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  name: {type: String},
  synonyms: {type: [String]}
}));