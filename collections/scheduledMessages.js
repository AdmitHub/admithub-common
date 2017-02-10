ScheduledMessages = new Mongo.Collection("scheduledMessages");
ScheduledMessages.attachSchema(new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    createdAt: {type: Date},
    query: {type: String, optional: true},
    collection: {type: String},
    messagingService: {type: String},
    workflow: {type: String, optional: true},
    message: {type: String, optional: true},
    scheduledAt: {type: Date},
    usersContacted: {type: Number, optional: true},
    sent: {type: Boolean, optional: true},
    note: {type: String, optional: true},
    context: {type: String, optional: true},
    userSearch: {type: Object, optional: true, blackbox: true},
    onGoing: {type: Boolean, optional: true},
    startDate: {type: Date, optional: true},
    endDate: {type: Date, optional: true},
    weekends: {type: Boolean, optional: true},
    paused: {type: Boolean, optional: true},
    batchSize: {type: Number, optional: true},
    allowCanTextFalse: {type: Boolean, optional: true} // override can text false limitation for opt in wf's
}));
