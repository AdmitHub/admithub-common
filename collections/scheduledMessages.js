ScheduledMessages = new Mongo.Collection("scheduledMessages");
ScheduledMessages.attachSchema(new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    query: {type: String},
    collection: {type: String},
    messagingService: {type: String},
    message: {type: String},
    scheduledAt: {type: Date}
}));
