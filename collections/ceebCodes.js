CeebCodes = new Mongo.Collection('ceebcodes')
CeebCodes.attachSchema(new SimpleSchema({
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  ceeb: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  highschool: {
    type: String
  }
}))

CeebCodes.findCeebCode = function (city, state, highschool) {
  return CeebCodes.findOne({
    $text: {
      $search: [state, city, highschool].join(' ')
    }
  }, {
    projection: {
      score: {$meta: 'textScore'}
    },
    sort: {
      score: {$meta: 'textScore'}
    }
  })
}
