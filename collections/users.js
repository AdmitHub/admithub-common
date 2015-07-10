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
      this.unset();
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
  "profile.canText": {
    type: Boolean,
    optional: true
  },

  "services": {type: Object, blackbox: true, optional: true},
  "roles": {type: [String], optional: true},
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
  // Debugging
  "test": {type: Boolean, defaultValue: false}
});

Meteor.users.attachSchema(UserSchema);
