Meteor.methods({
  initiatePhoneConfirmation: function(userId) {
    Oli.initiate({userId: userId, transport: "twilio"});
  }
});
