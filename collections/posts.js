// Owned and maintained by Telescope
try {
  Posts = new Mongo.Collection("posts");
} catch (e) {
  Posts = {};
}

Posts.STATUS_PENDING=1;
Posts.STATUS_APPROVED=2;
Posts.STATUS_REJECTED=3;
Posts.findMostSimilarPost = function(question) {
  return Posts.findOne({
    $text: {
      $search: question
    }
  }, {
    fields: {
      score: {$meta: "textScore"}
    },
    sort: {
      score: {$meta: "textScore"}
    }
  });
};

