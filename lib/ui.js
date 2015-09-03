if (Meteor.isClient) {
  UI.registerHelper('debug', function() {
    if (arguments.length === 0) {
      console.log(this);
    } else {
      console.log.apply(console, arguments);
    }
  });
  UI.registerHelper('equals', function(a, b) {
    return (a == b);
  });
  UI.registerHelper('enumerate', function(arr) {
    return _.map(arr, function(val, i) {
      if (val != null) {
        val.index = i;
        return val;
      } else {
        return {index: i};
      }
    });
  });
}
