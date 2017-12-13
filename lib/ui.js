if (Meteor.isClient) {
  Template.registerHelper('debug', function () {
    if (arguments.length === 0) {
      console.log(this)
    } else {
      console.log.apply(console, arguments)
    }
  })
  Template.registerHelper('equals', function (a, b) {
    return (a == b)
  })
  Template.registerHelper('enumerate', function (arr) {
    return _.map(arr, function (val, i) {
      if (val != null) {
        val.index = i
        return val
      } else {
        return {index: i}
      }
    })
  })
  Template.registerHelper('targetBlankNoFollow', function (html) {
    var $html = $('<div>' + html + '</div>')
    $html.find('a').each(function (i, el) {
      el.target = '_blank'
      el.rel = 'nofollow'
    })
    return $html.html()
  })
}
