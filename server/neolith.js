const o = {optional: true}
/**
 * Neolith API
 */
Neolith = {
  _callTokenEndpoint: function(method, endpoint, params) {
    var authToken = dotGet(Meteor, 'settings.oliApiAuthToken');

    var headers = {
      'x-auth-token': authToken
    }

    var syncPost = Meteor.wrapAsync(HTTP.call);
    try {
      console.log('Calling endpoint');
      console.log('Url: ', endpoint);
      console.log('Headers: ', headers);
      console.log('Params: ', params);

      return syncPost('POST', endpoint, {
        data: params,
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
    dialogId: fields.id(),
    query: fields.string(),
    hidden: fields.bool(o),
    importReportId: fields.id(o),
    recipientLabel: fields.string(o),
    selectedCalendar: fields.string(o),
    test: fields.bool(o),
    time: fields.string(o),
    workflowHumanName: fields.string(o)
  }),
  /**
   * Schedule a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.scheduleMessage``
   */
  scheduleMessage: function(params) {
    check(params, Neolith.scheduleMessageParams);

    return Neolith._callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.scheduleMessage'),
      params
    );
  },

  deleteScheduledMessageParams: new SimpleSchema({
    scheduledMessageId: fields.id()
  }),
  /**
   * Cancel a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.deleteScheduledMessage``
   */
  deleteScheduledMessage: function(params) {
    check(params, Neolith.deleteScheduledMessageParams);

    return Neolith._callTokenEndpoint(
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
    body: fields.long_string(),
    senderId: fields.id(),
    source: fields.string(),
    userId: fields.id(),
  }),

  sendSingleMessage: function(params) {
    check(params, Neolith.sendSingleMessageParams);

    return Neolith._callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.sendSingleMessage'),
      params
    );
  },

  // parameter schema for ``Neolith.forwardToCollege``
  forwardToCollegeParams: new SimpleSchema({
    messagingService: fields.string(),
    userId: fields.id(),
    logId: fields.id(),
    prefix: fields.string(),
    question: fields.string(),
    email: fields.email()
  }),
  /**
   * Forwards a student message to a college
   * @param {Object} params - Parameters as defined in ``forwardToCollegeParams`` schema
   */
  forwardToCollege: function(params) {
    check(params, Neolith.forwardToCollegeParams);
    return Neolith._callTokenEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.forwardToCollege'),
      params
    );
  }
};
