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

    return Neolith._callTokenEndpoint(
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
    userId: {type: String},
    source: {type: String},
    senderId: {type: String},
    body: {type: String}
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
    messagingService: {type: String},
    userId: {type: String},
    smsLogId: {type: String},
    queryLogId: {type: String},
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
    return Neolith._callTokenEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.forwardToCollege'),
      params
    );
  }
};
