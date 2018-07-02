/**
 * Neolith API
 */
Neolith = {

  /**
   * Schedule a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.scheduleMessage``
   */
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
  scheduleMessage: function(params, callback) {
    check(params, this.scheduleMessageParams);
    return _callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.scheduleMessage'),
      params
    );
  },

  /**
   * Cancel a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.deleteScheduledMessage``
   */
  deleteScheduledMessageParams: new SimpleSchema({
    scheduledMessageId: {type: String}
  }),
  deleteScheduledMessage: function(params, callback) {
    check(params, this.deleteScheduledMessageParams);
    return _callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.deleteScheduledMessage'),
      params
    );
  },

  /**
   * Change the segment label defining the recipients of a scheduledMessage
   *
   * @param {Object} params - Parameters as defined in ``Neolith.deleteScheduledMessage``
   */
  changeScheduledMessageRecipientLabelParams: new SimpleSchema({
    scheduledMessageId: {type: String},
    newRecipientLabel: {type: String},
  }),
  changeScheduledMessageRecipientLabel: function(params) {
    check(params, this.changeScheduledMessageRecipientLabelParams);
    return _callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.changeScheduledMessageRecipientLabel'),
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
  sendSingleMessage: function(params, callback) {
    check(params, this.sendSingleMessageParams);
    return _callTokenEndpoint(
      'POST',
      dotGet(Meteor, 'settings.neolith.sendSingleMessage'),
      params
    );
  },

  /**
   * Forwards a student message to a college
   * @param {Object} params - Parameters as defined in ``forwardToCollegeParams`` schema
   */
  forwardToCollegeParams: new SimpleSchema({
    messagingService: {type: String},
    userId: {type: String},
    logId: {type: String},
    prefix: {type: String},
    question: {type: String},
    email: {type: String}
  }),
  forwardToCollege: function(params) {
    check(params, this.forwardToCollegeParams);
    return _callTokenEndpoint('POST',
      dotGet(Meteor, 'settings.neolith.forwardToCollege'),
      params
    );
  },

};

function _callTokenEndpoint(method, endpoint, params) {
  const authToken = dotGet(Meteor, 'settings.oliApiAuthToken');

  const headers = {
    'x-auth-token': authToken
  };

  const syncPost = Meteor.wrapAsync(HTTP.call);
  try {
    console.log('Calling endpoint');
    console.log('Url: ', endpoint);
    console.log('Headers: ', headers);
    console.log('Params: ', params);

    return syncPost('POST', endpoint, {
      data: params,
      headers: headers
    });
  } catch (e) {
    if (typeof logger !== "undefined") {
      logger.error('Error calling ' + endpoint + ':\n  params: ', params,'\n',e);
    } else {
      console.log("Error calling " + endpoint + ":\n params: ", params,'\n',e);
    }
    throw e;
  }
}

export default Neolith;