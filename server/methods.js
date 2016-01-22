Meteor.methods({
  initiatePhoneConfirmation: function(userId) {
    // Subtle ugly hack here: if the message Body is undefined, the message
    // will bypass validation. This is so that we can initiate a message from a
    // college or admithub and have get through without triggering validation
    // middleware. By setting the body to emptystring here, we will trigger
    // validation if needed, and then the phone confirmation handler will fire
    // next.
    Oli.initiate({userId: userId, transport: "twilio", Body: ""});
  },
  findDreamCollegeId: function(userInputCollege) {
    // Implementation duplicated in oli/methods.js
    check(userInputCollege, String);
    var college = Colleges.findByName(userInputCollege)
    if (college && college.score > Colleges.FIND_BY_NAME_CUTOFF) {
      return college._id;
    }
  }
});
