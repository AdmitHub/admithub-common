if (Meteor.isClient) {
  UI.registerHelper('debug', function(obj) {
    if (typeof obj === "undefined") {
      console.log(this);
    } else {
      console.log(obj);
    }
  });
}
