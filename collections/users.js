UserSchema = new SimpleSchema({
  "_id": fields.id({optional: true}),
  // Accounts username
  "username": fields.username({optional: true}),
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
    })
  },
  "emails.$.address": {type: String, regEx: SimpleSchema.RegEx.Email},
  "emails.$.verified": {type: Boolean},
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
  "smsHardStopped": {
    type: Boolean,
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
  // Debugging
  "test": {type: Boolean, defaultValue: false},
  "startInitialSurvey": {type: Boolean, optional: true},
  "resumeWorkflow": {type: Boolean, optional: true}
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

Meteor.users.before.update(function(userId, doc, fieldNames, modifier, options) {
  if (modifier && modifier.$set && modifier.$set["profile.phone"]) {
    modifier.$set.phonePending = true;
    Meteor.defer(function() {
      var user = Meteor.users.findOne({
        "profile.phone": modifier.$set["profile.phone"],
        "phonePending": {$ne: true}
      });
      if (user) {
        var workflow = Workflows.push(user);
        if (workflow) {
          console.log('Ending workflow', "+1"+user.profile.phone, workflow.name, workflow.persona)
          SMSLoadBalancer.endWorkflow("+1"+user.profile.phone, workflow.name, workflow.persona);
        }
      }
      else {
        user = Meteor.users.findOne({
          "profile.phone": modifier.$set["profile.phone"],
          "phonePending": true
        }); 
      }

      var wf = new Workflows.EmailConfirmationBot;
      if (!SmsValidations.methods.getValidation(user.profile.phone)) {
        var validation = SmsValidations.methods.newValidation(user.profile.phone);
        var message = SmsValidations.methods.prompt(validation);
        SMSLoadBalancer.sendSMS("+1"+user.profile.phone,
          message,
          wf.name,
          "oli");
      }
      else {
        wf.initialize(user);
        SMSLoadBalancer.sendSMS("+1"+user.profile.phone,
          wf.run().text.join(" "),
          wf.name,
          "oli");
      }
    });
  }
});

Meteor.users.before.insert(function(userId, doc) {
  var email = dotGet(doc, "emails.0.address");
  if (doc.profile.subscribedToNewsletter && email) {
    Meteor.call('addEmailToMailChimpList', email, function (error, result){
      if (error){console.log(error)}
    });
  }
});

Meteor.users.attachSchema(UserSchema);
