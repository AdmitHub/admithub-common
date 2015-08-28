/******************** Role ********************/
/**
* Identifies the role of a user
*/
var Role = {
  STUDENT: 0,
  HIGHSCHOOL: 1,
  COLLEGE: 2,
  ADMITHUB: 3
};

/******************** Contact ********************/
/**
* Identifies a user
* @param obj A constructor object containing the fields role", and "name"
* @returns New contact
*/
function Contact(obj) {
  var self = this;

  self.id = obj.id;
  self.role = obj.role;
  self.name = obj.name;

  return self;
}

/******************** Chat Provider ********************/
/**
* Responsible for managing everything about a chat medium
* @returns New ChatProvider
*/
function ChatProvider() {
  var self = this;

  return self;
}

/**
* Gets a list of conversations from the chat provider
* @returns An array of Conversations
*/
ChatProvider.prototype.getConversations = function() {};

/**
* Creates a conversation for chat provider
* @param conversation The new conversation object
* @returns Provided conversation object with valid id
*/
ChatProvider.prototype.createConversation = function(conversation) {};

/**
* Gets messages for a conversation
* @param conversationId The id of the conversation to fetch messages for
* @returns Array of messages in conversation
*/
ChatProvider.prototype.getMessages = function(conversationId) {};

/**
* Creates a message in a conversation
* @param conversationId The id of the conversation to add a message to
* @param message The message
* @returns Provided message with valid id
*/
ChatProvider.prototype.createMessage = function(conversationId, message) {};

/**
* Calculates the unread count for a conversation. The unread count is
* determined by the number of unread messages since the last message from
* another party
* @param conversationId The conversation to get the unread count for
* @returns Unread count of message
*/
ChatProvider.prototype.getUnreadCount = function(conversationId) {};

/******************** Conversation ********************/
/**
* Conversation model
* @param obj A constructor object containing the fields "chatProvider" and
*            "contacts"
* @returns A new Conversation object
*/
function Conversation(obj) {
  var self = this;

  self.id = obj.id;
  self.chatProvider = obj.chatProvider;
  self.contacts = obj.contacts;

  return self;
}

/**
* A proxy for {@link ChatProvider#getMessages(conversationId)} using the
* chatProvider field
*/
Conversation.prototype.getMessages = function() {
  return self.chatProvider.getMessages(self.id);
};

/**
* A proxy for {@link ChatProvider#createMessage(conversationId, message)}
* using the chat provider field
*/
Conversation.prototype.createMessage = function(message) {
  return self.chatProvider.createMessage(self.id, message);
};

/**
* A proxy for {@link ChatProvider#getUnreadCount(conversationId)} using the
* chatProvider field
*/
Conversation.prototype.getUnreadCount = function() {
  return self.chatProvider.getUnreadCount(self.id);
};

/**
* Gets the conversations title
* @returns Conversation title
*/
Conversation.prototype.getTitle = function() {};

/******************** Message ********************/
/**
* Message model
* @param obj A constructor object containing the fields "sender", "content",
*        "read", and "created"
* @returns New Message object
*/
function Message(obj) {
  var self = this;

  self.id = obj.id;
  self.sender = obj.sender;
  self.content = obj.content;
  self.read = obj.read;
  self.created = obj.created;

  return self;
}
