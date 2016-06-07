/**
 * Oli API
 */
Oli = {
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
      'X-Twilio-Signature': Oli.getTwilioSignature(
        authToken, endpoint, params)
    };

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
  // Parameter schema for ``Oli.initiate``
  initiateParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    // FIXME: remove transport once oli doesn't epend on it.
    transport: {type: String, allowedValues: ["twilio", "web"], optional: true},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true, blackbox: true},
    forceRevalidate: {type: Boolean, optional: true},
    validationWindow: {type: Number, optional: true},
    prefix: {type: String, optional: true},
    messagingService: {type: String, optional: true}
  }),
  /**
   * Tell Oli to start workflow processing for the given userId in its current
   * state.
   * @param {Object} params - Parameters as defined in ``Oli.initiateParmas``
   * schema.
   */
  initiate: function(params) {
    check(params, Oli.initiateParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Oli._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.oli.initiate'),
      params
    );
  },
  // parameter schema for ``Oli.handleWebMessage``
  handleWebMessageParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    body: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true}
  }),
  /**
   * Forward a message posted via the web on to Oli.
   * @param {Object} params - Parameters as defined in
   * ``Oli.handleWebMessageParams`` schema
   */
  handleWebMessage: function(params) {
    check(params, Oli.handleWebMessageParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Oli._callEndpoint(
      'POST',
      dotGet(Meteor, 'settings.oli.handleWebMessage'),
      params
    );
  },
  // parameter schema for ``Oli.coldSMS``
  coldSmsParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    text: {type: String, optional: true},
    media: {type: String, regEx: SimpleSchema.RegEx.Url, optional: true},
    workflow: {type: String, optional: true},
    workflowOptions: {type: Object, optional: true, blackbox: true},
    forceRevalidate: {type: Boolean, optional: true},
    delayWorkflow: {type: Boolean, optional: true},
    validationWindow: {type: Number, optional: true},
    messagingService: {type: String, optional: true}
  }),
  /**
   * Fire off an SMS to Oli, bypassing any usual workflow processing.
   * @param {Object} params - Parameters as defined in ``coldSmsParams`` schema
   */
  coldSMS: function(params) {
    check(params, Oli.coldSmsParams);
    params.workflowOptions = params.workflowOptions && JSON.stringify(
      params.workflowOptions
    );
    if (!params.workflowOptions) {
      delete params.workflowOptions;
    }
    return Oli._callEndpoint('POST',
      dotGet(Meteor, 'settings.oli.coldSMS'),
      params
    );
  },
  // parameter schema for ``Oli.officerChat``
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
    check(params, Oli.officerChatParams);
    return Oli._callEndpoint('POST',
      dotGet(Meteor, 'settings.oli.officerChat'),
      params
    );
  },
  // parameter schema for ``Oli.appendMatchMessage``
  appendMatchMessageParams: new SimpleSchema({
    userId: {type: String, regEx: SimpleSchema.RegEx.Id},
    collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    highschoolId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    message: {type: String},
    sender: {type: String, allowedValues: ["student", "highschool", "college", "admithub"]},
    onlyIfEmpty: {type: Boolean, optional: true}
  }),
  /**
   * Send a message from a student to a officer/highschool
   * @param {Object} params - Parameters as defined in ``appendMatchMessageParams`` schema
   */
  appendMatchMessage: function(params) {
    check(params, Oli.appendMatchMessageParams);
    return Oli._callEndpoint('POST',
      dotGet(Meteor, 'settings.oli.appendMatchMessage'),
      params
    );
  },
  // parameter schema for ``Oli.forwardToCollege``
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
    check(params, Oli.forwardToCollegeParams);
    return Oli._callEndpoint('POST',
      dotGet(Meteor, 'settings.oli.forwardToCollege'),
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
