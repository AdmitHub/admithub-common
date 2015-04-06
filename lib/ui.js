if (Meteor.isClient) {
  UI.registerHelper('debug', function() {
    if (arguments.length === 0) {
      console.log(this);
    } else {
      console.log.apply(console, arguments);
    }
  });
}
