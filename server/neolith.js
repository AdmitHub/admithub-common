/**
 * Neolith API
 */
Neolith = {
  getTwilioSignature: function(authToken, url, params) {
    Object.keys(params).sort().forEach(function(key, i) {
      url = url + key + params[key];
    });
    return Npm.require('crypto').createHmac('sha1', authToken)
                                .update(new Buffer(url, 'utf-8'))
                                .digest('Base64');
  },
  _callEndpoint: function(method, endpoint, params) {
    var authToken = dotGet(Meteor, 'settings.twilio.authToken');

    var headers = {
      'X-Twilio-Signature': Neolith.getTwilioSignature(
        authToken, endpoint, params)
    };

    var syncPost = Meteor.wrapAsync(HTTP.call);
    try {
      console.log('Calling endpoint')
      console.log('Url: ', endpoint)
      console.log('Headers: ', headers)
      console.log('Params: ', params)

      return syncPost('POST', endpoint, {
        params: params,
        headers: headers
      });
    }
    catch (e) {
      if (typeof logger !== "undefined") {
        logger.error('Error calling ' + endpoint + ':\n  header: ', headers, '\nparams: ', params,'\n',e);
      } else {
        console.log('Error calling ' + endpoint + ':\n  header: ', headers, '\nparams: ', params,'\n',e);
      }
      throw e;
    }
  },
  _callTokenEndpoint: function(method, endpoint, params) {
    var authToken = dotGet(Meteor, 'settings.neolith.ApiAuthToken');

    var headers = {
      'X-auth-token': authToken
    }

    var syncPost = Meteor.wrapAsync(HTTP.call);
    try {
      return syncPost('POST', endpoint, {
        params: params,
        headers: headers
      });
    }
    catch (e) {
      if (typeof logger !== "undefined") {
        logger.error('Error calling ' + endpoint + ':\n  params: ', params,'\n',e);
      } else {
        console.log("Error calling " + endpoint + ":\n params: ", params,'\n',e);
      }
      throw e;
    }
  },

  // Parameter schema for ``Neolith.initiate``
  scheduleMessageParams: new SimpleSchema({
    time: {type: String, optional: true},
    dialogId: {type: String},
    query: {type: String},
    recipientLabel: {type: String, optional: true},
    workflowHumanName: {type: String, optional: true},
    selectedCalendar: {type: String, optional: true},
    importReportId: {type: String, optional: true},
    test: {type: Boolean, optional: true},
    hidden: {type: Boolean, optional: true}
  }),
  /**
   * Schedule a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.scheduleMessage``
   */
  scheduleMessage: function(params) {
    check(params, Neolith.scheduleMessageParams);

    return Neolith._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.scheduleMessage'),
      params
    );
  },

  deleteScheduledMessageParams: new SimpleSchema({
    scheduledMessageId: {type: String}
  }),
  /**
   * Cancel a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.deleteScheduledMessage``
   */
  deleteScheduledMessage: function(params) {
    check(params, Neolith.deleteScheduledMessageParams);

    return Neolith._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.deleteScheduledMessage'),
      params
    );
  },

  /**
   * Schedule a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.scheduleMessage``
   */
  sendSingleMessageParams: new SimpleSchema({
    userId: {type: String},
    source: {type: String},
    senderId: {type: String},
    body: {type: String}
  }),
  sendSingleMessage: function(params) {
    check(params, Neolith.sendSingleMessageParams);

    return Neolith._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.sendSingleMessage'),
      params
    );
  },

  // Parameter schema for ``Neolith.initiate``
  initiateParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    // FIXME: remove transport once neolith doesn't epend on it.
    senderId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    transport: {type: String, allowedValues: ["twilio", "web"], optional: true},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true, blackbox: true},
    forceRevalidate: {type: Boolean, optional: true},
    ignorePausedUntil: {type: Boolean, optional: true},
    validationWindow: {type: Number, optional: true},
    prefix: {type: String, optional: true},
    messagingService: {type: String, optional: true}
  }),
  /**
   * Tell Neolith to start workflow processing for the given userId in its current
   * state.
   * @param {Object} params - Parameters as defined in ``Neolith.initiateParmas``
   * schema.
   */
  initiate: function(params) {
    check(params, Neolith.initiateParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Neolith._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.initiate'),
      params
    );
  },

  // parameter schema for ``Neolith.handleWebMessage``
  handleWebMessageParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true}
  }),
  /**
   * Forward a message posted via the web on to Neolith.
   * @param {Object} params - Parameters as defined in
   * ``Neolith.handleWebMessageParams`` schema
   */
  handleWebMessage: function(params) {
    check(params, Neolith.handleWebMessageParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Neolith._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.handleWebMessage'),
      params
    );
  },

  // parameter schema for ``Neolith.coldSMS``
  coldSmsParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    text: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true, blackbox: true},
    forceRevalidate: {type: Boolean, optional: true},
    validationWindow: {type: Number, optional: true},
    messagingService: {type: String, optional: true}
  }),
  /**
   * Fire off an SMS to Neolith, bypassing any usual workflow processing.
   * @param {Object} params - Parameters as defined in ``coldSmsParams`` schema
   */
  coldSMS: function(params) {
    check(params, Neolith.coldSmsParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Neolith._callEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.coldSMS'),
      params
    );
  },

  // parameter schema for ``Neolith.officerChat``
  officerChatParams: new SimpleSchema({
    collegeToken: {type: String},
    from: {type: String},
    message: {type: String}
  }),
  /**
   * Send a message from a college officer to a student
   * @param {Object} params - Parameters as defined in ``officerChatParams`` schema
   */
  officerChat: function(params) {
    check(params, Neolith.officerChatParams);
    return Neolith._callEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.officerChat'),
      params
    );
  },

  // parameter schema for ``Neolith.appendMatchMessage``
  appendMatchMessageParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    highschoneolithd: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    message: {type: String},
    sender: {type: String, allowedValues: ["student", "highschool", "college", "admithub"]},
    onlyIfEmpty: {type: Boolean, optional: true}
  }),
  /**
   * Send a message from a student to a officer/highschool
   * @param {Object} params - Parameters as defined in ``appendMatchMessageParams`` schema
   */
  appendMatchMessage: function(params) {
    check(params, Neolith.appendMatchMessageParams);
    return Neolith._callEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.appendMatchMessage'),
      params
    );
  },

  // parameter schema for ``Neolith.forwardToCollege``
  forwardToCollegeParams: new SimpleSchema({
    messagingService: {type: String},
    userId: {type: String},
    logId: {type: String},
    prefix: {type: String},
    question: {type: String},
    email: {type: String}
  }),
  /**
   * Forwards a student message to a college
   * @param {Object} params - Parameters as defined in ``forwardToCollegeParams`` schema
   */
  forwardToCollege: function(params) {
    check(params, Neolith.forwardToCollegeParams);
    return Neolith._callEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.forwardToCollege'),
      params
    );
  },

  /**
   * Express middleware to authenticate requests using twilio's authentication
   * strategy. See https://www.twilio.com/docs/security
   */
  authenticateTwilio: function(req, res, next) {
    var twilio = Meteor.npmRequire('twilio');
    var valid = twilio.validateRequest(
      dotGet(Meteor, "settings.twilio.authToken") || '1234',
      dotGet(req, "headers.x-twilio-signature"),
      Meteor.absoluteUrl(req.url.substring(1)), // strip leading "/"
      req.body
    );

    if (valid) {
      next();
    } else {
      if (Meteor.isDevelopment) {
        if (typeof logger !== "undefined") {
          logger.error("Twilio auth failed; but allowing anyway, because isDevelopment is true");
        } else {
          console.error("Twilio auth failed; but allowing anyway, because isDevelopment is true");
        }
        next();
      } else {
        res.writeHead(401, {"Content-Type": "text/plain"});
        res.end("Authentication failed");
      }
    }
  },
};
