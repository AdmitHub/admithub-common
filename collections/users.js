UserSchema = new SimpleSchema({
  "_id": fields.id({optional: true}),
  // Accounts username
  "username": fields.username({optional: true}),
  "admitHubUser": {optional: false, type: Boolean, defaultValue: false},
  "modified": {type: Date, autoValue: function() { return new Date(); }},
  "slug": {
    type: String,
    unique: false,
    optional: true,
    autoValue: function() {
      if (this.field('username').isSet) {
        return slugify(this.field('username').value);
      }
    }
  },
  "emails": {
    type: [Object],
    autoValue: fields.callableDefaultValue(function() {
      return [];
    }),
    optional: true
  },
  "emails.$.address": {type: String, regEx: SimpleSchema.RegEx.Email, optional: true},
  "emails.$.verified": {type: Boolean, optional: true},
  "emails.$.smsVerifyCode": {type: String, optional: true},
  "email_hash": {type: String, optional: true},
  "createdAt": fields.created_date(),
  "profile": {
    type: Object,
    blackbox: true,
    autoValue: function() {
      // Ensure the profile object is present.
      if (!this.isSet) {
        if (this.isInsert) {
          return {};
        } else if (this.isUpsert) {
          return {$setOnInsert: {}};
        }
      } else if (this.value.phone) {
        // Cleaning for phone values. This only gets called for
        // ``$set: {profile: {phone: ...}}``.  We need to duplicate this
        // in the ``$set: {"profile.phone": ...}`` below.
        this.value.phone = fields.cleanPhone(this.value.phone);
      }
      return this.value;
    }
  },
  "profile.facebookId": {
    type: String,
    optional: true
  },
  "phone": { type: new SimpleSchema({
    "wrongNumber": {type: Boolean, optional: true},
    "twilioLookUpValid": {type: Boolean, optional: true},
    "nonWorkingNumber": {type: Boolean, optional: true},
    "nonWorkingNumberCode": {type: String, optional: true},
    "previousPhone": {type: String, optional: true},
    "passiveOptOut": {type: Boolean, optional: true},
    "carrier": {type: String, optional: true}
  }),optional: true},
  "snapshotReference": { type: new SimpleSchema({
    id: {type: String, optional: true},
    workflowName: {type: String, optional: true}
  }), optional: true},
  "profile.phone": {
    type: String,
    min: 10,
    max: 10,
    autoValue: function() {
      if (this.isSet) {
        // Cleaning for phone values. This only gets called for
        // ``$set: {"profile.phone": ...}``. We need to duplicate this
        // ``$set: {profile: {phone: ...}}`` above.
        return fields.cleanPhone(this.value);
      }
      return this.value;
    },
    optional: true
  },
  "phonePending": {
    type: Boolean,
    optional: true
  },
  "profile.canText": {
    type: Boolean,
    optional: true,
    defaultValue: true
  },
  "profile.tags": {
    type: [String],
    optional: true
  },
  "profile.subscriptions": {
    type: Object,
    optional: true
  },
  "profile.subscriptions.eventReport": {
    type: Boolean,
    optional: true,
    defaultValue: true
  },
  "profile.subscriptions.weeklyReport": {
    type: Boolean,
    optional: true,
    defaultValue: true
  },
  "profile.firstOutgoing": { //marks our first message sent to user
    type: Date,
    optional: true
  },
  "profile.hasSent": { // indicates user has sent message to admithub
    type: Boolean,
    optional: true
  },
  "profile.notifications": {
    type: String,
    optional: true
  },
  "smsHardStopped": {
    type: Boolean,
    optional: true
  },
  "hardStopReason": {
    type: String,
    allowedValues: ["mistake", "oliTalksTooMuch", "notAStudent", "noHelp", "somethingElse"],
    optional: true
  },
  "hardStopToken": {
    type: String,
    optional: true
  },

  "services": {type: Object, blackbox: true, optional: true},
  "roles": {type: Object, blackbox: true, optional: true},
  "referralCode": {
    type: String,
    autoValue: fields.insertOnlyValue(function() {
      return Meteor.uuid();
    })
  },
  "referralCredits": {type: [Object], optional: true},
  "referralCredits.$.sentTo": fields.id({optional: true}),
  "referralCredits.$.referredBy": fields.id({optional: true}),
  "referralCredits.$.value": {type: Number, optional: true},
  "referralCredits.$.spent": fields.id({optional: true}), // transaction ID

  // SMS workflows
  "workflow": {type: Object, blackbox: true, optional: true},

  // Telescope-specific
  "data": {
    type: Object,
    blackbox: true,
    autoValue: fields.callableDefaultValue(function() {
      return {};
    })
  },
  "votes": {
    type: Object,
    blackbox: true,
    autoValue: fields.callableDefaultValue(function() {
      return {};
    })
  },
  "sharing": {type: Boolean, optional: true},
  "telescope": {type: Object, optional: true, blackbox: true},
  "test": {type: Boolean, defaultValue: false, optional: true}, // Debugging
  "testUser": {type: Boolean, optional: true},
  "startInitialSurvey": {type: Boolean, optional: true},
  "resumeWorkflow": {type: Boolean, optional: true},

  "abGroup": {type: Number, optional: true, max: 1, min: 0, decimal: true},
  // For phoenix users (staff)
  "phoenixUser": {type: Boolean, optional: true, defaultValue: false},
  "presence": {type: Object, blackbox: true, optional: true},
  "status": {type: Object, blackbox: true, optional: true},
  "pinnedConversations": {type: [String], optional: true, defaultValue: []},
  "recentConversations": {type: [String], optional: true, defaultValue: []},
  "currentInstitution": {type: String, optional: true},

  // For admithub users (students)
  "schools": {type: [String], optional: true, defaultValue: []},
  "importSegmentLabels": {type: [String], optional: true, defaultValue: []},
  "lastContacted": { type: Date, optional: true },
  "lastMessageId": { type: String, optional: true }
});

Meteor.users.before.insert(function(userId, doc) {
  if (!doc.slug) {
    doc.slug = slugify(doc._id);
  }
  if (!dotGet(doc, "telescope.slug")) {
    dotSet(doc, "telescope.slug", doc.slug || doc._id);
  }
  return doc;
});


Meteor.users.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Meteor.isServer) {
    //If we just changed the phone number, initiate phone confirmation.
    var currentPhone = dotGet(doc, "profile.phone");
    var previousPhone = dotGet(this.previous, "profile.phone");
    var cleanCurrent = currentPhone && fields.cleanPhone(currentPhone);
    var cleanPrevious = previousPhone && fields.cleanPhone(previousPhone);
    if (cleanCurrent && doc.phonePending && (cleanPrevious !== cleanCurrent)) {
      return Meteor.call("initiatePhoneConfirmation", doc._id);
    }
  }
});

Meteor.users.before.insert(function(userId, doc) {
  if (Meteor.isServer) {
    // Add new email to mailchimp list if we change our email
    var email = dotGet(doc, "emails.0.address");
    if (doc.profile.subscribedToNewsletter && email) {
      Meteor.call('addEmailToMailChimpList', email, function (error, result){
        if (error){console.log(error)}
      });
    }
  }
});

Meteor.users.updateHash = function(user) {
  var recipientAddress = dotGet(user, "emails.0.address");
  var emailHash = Gravatar.hash(recipientAddress || "");
  if (emailHash !== dotGet(user, "telescope.emailHash")) {
    Meteor.users.update({
      _id: user._id
    }, {
      $set: {
        "telescope.emailHash": emailHash
      }
    });
  }

  return emailHash;
}

Meteor.users.attachSchema(UserSchema);
