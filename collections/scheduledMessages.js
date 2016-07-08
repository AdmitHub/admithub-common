ScheduledMessages = new Mongo.Collection("scheduledMessages");
ScheduledMessages.attachSchema(new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    query: {type: String},
    collection: {type: String},
    messagingService: {type: String},
    workflow: {type: String, optional: true},
    message: {type: String, optional: true},
    scheduledAt: {type: Date},
    usersContacted: {type: Number, optional: true},
    sent: {type: Boolean, optional: true},
    note: {type: String, optional: true}
}));
