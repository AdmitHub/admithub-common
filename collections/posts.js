// The Posts collection is owned
try {
  TelescopePosts = new Mongo.Collection('posts')
} catch (e) {
  TelescopePosts = {}
}
TelescopePosts.getCollection = function () {
  if (typeof Posts !== 'undefined') {
    return Posts
  }
  return TelescopePosts
}

TelescopePosts.STATUS_PENDING = 1
TelescopePosts.STATUS_APPROVED = 2
TelescopePosts.STATUS_REJECTED = 3
TelescopePosts.findMostSimilarPost = function (question) {
  return TelescopePosts.getCollection().findOne({
    $text: {
      $search: question
    },
    status: TelescopePosts.STATUS_APPROVED
  }, {
    projection: {
      score: {$meta: 'textScore'}
    },
    sort: {
      score: {$meta: 'textScore'}
    }
  })
}

