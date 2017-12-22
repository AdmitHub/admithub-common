# admithub-common
Common styles, templates, and library functions and classes for AdmitHub apps

## Schema

### BrandedApplicantConversations
Records the history of email exchanges between student user and instution.
Fields:
  - `applicantId` Type: String. Required. **Deprecated**. It was some kind of special identifier of the student; it is now identical to the `userId` -- i.e., it is the `_id` of the `brandedUserProfile` document of the relevant student user. I think it is non-functional. (To do: eliminate this.)
  - `messages`: Type: \[Object\]. Required. An array containing object that record information about the messages exchanges between the student user and the institution. Subfields:
    - `body` Type: String. Required. The text of the message.
    - `created` Type: Date. Required. Date the message was created. (To do: change name to `createdAt`.)
    - `sender` Type: String. Required. Allowed values: `student`, `college`, `admithub`. Indicates the source of the message.
    - `auto` Type: Boolean. Optional. Indicates whether the email was auto-generated becaue of the topic returned by Holocene. (To do: make this required.)
    - `email` Type: String. Optional. The email address at the institution to which the email was sent, or from which it was received. (To do: make this required.)
    - `logId` Type: String. Optional. According to a comment in the code, this is non-functional; I speculate that it is intended to record the ai-log associated with an auto-generated email. (To do: either make this functional or get rid of it.)
    - `unverified` Type: Boolean. Optional. Set as `true` on all emails received at the `/api/receiveEmail` endpoint. That includes all emails from an institution that respond to an auto-generated or triager-generated email. This is used to filter those messages that get sent as part of the body of an email forwarded to an institution. (To do: verify this is desired behaviour. If not, get rid of it.)
  - `brandedCollegeId`: Type: String. Optional. The `_id` of the `brandedCollege` document of the relevant institution. (To do: make this required, until we merge the `_id` and `messagingService` fields of the `brandedCollege` document, then either get rid of this one or `messaginService`.)
  - `created`: Type: Date. Optional. The date the document was created. (To do: change name to `createdAt` if this name isn't necessary for metabase. (A comment suggests it *is* necessary for metabase.) Make required.)
  - `handled` Type: Boolean. Optional. Default value: `false`. Indicates if the user interaction has been handled to completion or not (It think). Toggled in the UI. Used to filter messages that appear in the UI. (To do: make this required.)
  - `messagingService`: Type: String. Optional. The `messagingService` field on the relevant institutions `brandedUserProfile` document. (To do: make this required. And see `brandedCollegeId`.)
  - `userId`: Type: String. Optional. The `_id` of the `brandedUserProfile` document of the relevant student user. (To do: make this required.)

### BrandedColleges
Documents containing details about partner institutions.
Fields:
 - `aiSubject` Type: String. Required. A string used as part of the input contexts passed to Holocene calls.
 - `disabledFeatures` Type: \[String\]. Required. Default value: empty array. 
 - `messagingService`: Type: String. Required. Name of the messaging service of the institution. (To do: make only one of this and `_id` exist.)
 - `name` Type: String. Required. Full name of the institution.
 - `oliName` Type: String. Required. Name of the bot personality. (To do: consider changing name. Though maybe we want to keep it for nostalgia resons.)
 - `abbr` Type: String. Optional. Abbreviated form of the institution's name.
 - `animal` Type: String. Optional. The species (or whatever) of the institution's mascot.
 - `collection` **Deprecated** Type: String. Optional. The collection of user documents associated with the institution. (To do: get rid of this, unless we decide we do want to use seperate collections after all.)
 - `collegeId` **Deprecated** Type: String. Optional. Regex: Simple-schema style id. What used to be the id of the institution in the `college` documents. (To do: get rid of this.)
 - `counselors` Type: \[Object\]. Optional. Default value: empty array. Blackbox. *I think* a list of counselors. If so, this is **deprecated**. (To do: confirm usage, and probably get rid of it. Also, no need for default value. Also, eliminate black boxes, if possible.)
 - `csvTransformPipeline` Type: \[String\] Optional. Default value: empty array. 
 - `dateAccepted` Type: String. Optional. The date by which acceptance decisions are announced by the institution. (To do: think about if we should have fields like this. We can use them in templating for cross-institutional dialogs, but the common practice seems to be to make dialogs that need this sort of thing ad hoc for each instution, so these don't get used much. This particular one, for instance, doesn't exist on any current `brandedUserProfile` document. Also, I think we should encourage the ad-hoc dialog creation, because it is something partner institutions can do themselves.)
 - `dateScholarship` Type: String. Optional. Unclear; either the date by which scholarship decisions are made, or the date by which scholarship applications are due. (To do: see `dateAccepted`.)
 - `departments` Type: \[Object\]. Optional. Default value: empty array. Blackbox. *I think* a list of information concerning the schools departments. (To do: remove default value, eliminate blackbox. Determine usage. Possibly eliminate.)
 - `dialogSettings` Type: Object. Optional. Settings used to control behaviour around the dialog returned to users. (To do: make this required.) Subfields:
   - `botOffDialog` Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users when the bot is otherwise non-functional (in the event that we want there to be such a dialog).
   - `botOffNoDialog` Type: Boolean. Optional. Return no dialog under any circumstances, if value is `true`; bot is non-functional. (To do: consider changing name; the symmetry with `botOffDialog` suggests this should be a string. But I can't think of a great alternative.)
   - `createAndIntroDialog`: Type: String. Optional
   - `knownNonContactedStudentDialog`: Type: String. Optional. Field not currently in use. Originally intended for a sub-case of the cases where `unknownStudentDialogBotOn` are used: specifically those students who have yet to have interacted with the system, but are known to the system via import. We can in the future distinguish that case from the completely unknown case, if we want.
   - `unknownStudentDialogBotOff`: Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users who have been deliberately barred from the system, which by default is all unknown users for a closed bot. If this field doesn't exist, users are sent `filterBot` in those circumstances. (To do: change name.)
   - `unknownStudentDialogBotOn` Type: String. Optional. The `_id` of the `dialog` document of the dialog sent to users if they intitate a conversation without ever having interacted with the bot. If this field does not exist, the user is, in those circumstances, sent `defaultUnknownStudentDialogBotOn` (To do: change the name.)
   - `finishedConversationDialog` Type: String. Optional. *I think* this was intended for users who, for whatever reason, we've decided we for users we don't want to talk to any further, like users who have identified as parents. It's the `_id` on the `dialog` of the intended dialog. (To do: confirm use case; if confirmed, remove either this or `unknownStudentDialogBotOff`; this seems to replicate functionality.)
 - `emailPrefix` Type: String. Optional. The prefix used in in messages to students generated by institution emails. (To do: make this required.)
 - `enabledFeatures`. Type: \[String\]. Optional. Default value: empty array.
 - `facebookId`: Type: String. Optional. The id of the facebook page using our facebook app that is associated with the institution.
 - `filterOn` Type: Boolean. Optional. The field that distinguished open bots (value `false`) from closed bots (value `true`). (To do: move this to `dialogSettings`. Make required.)
 - `hashtag` Type: String. Optional. The hashtag used for social media campaigns. (To do: see `dateAccepted`.)
 - `infoGatheringBot` Type: String. Optional. Dialog scheduled after the initial dialog in an open bot. (To do: move this to `dialogSettings`.
 - `intentDeadline` Type: Date. Optional. Deadline by which students must fill intent-to-enroll paperwork. (To do: see `dateAccepted`.)
 - `internalFieldMapping`: Type: Object. Optional. Default value: empty object. Blackbox.
 - `introKnownProspectBotPhoto` Type: String. Optional. Default value: empty string. Url of a photo used in the (not currently existing) `introKnownProspectBot` dialog. (To do: see `dateAccepted`. Also, there's no reason to have a default value here for an optional field.)
 - `linkAcceptAid` Type: String. Optional. Link to website at which a student can accept financial aid from the institution. (To do: see `dateAccepted`.)
 - `linkAdmit` Type: String. Optional. A link admitted students use to see what next steps to take. (To do: see `dateAccepted`.)
 - `linkCounselors` Type: String. Optional. Link for students to learn more about the instution's counselors. Used in the old `filterBot`. (To do: add templating in `filterBot` to use this.)
 - `linkIncompleteApplication`: Type: String. Optional. Unclear; no current appearance in code or data. Presumably something a link for students to compelte an incomplete application. (To do: see `dateAccepted`.)
 - `linkFafsa` Type: String. Optional. Link to information about the FAFSA. (To do: see `dateAccepted`.)
 - `linkFinAid` Type: String. Optional. Link to information about the institutions financial aid. (To do: see `dateAccepted`.)
 - `linkIntentToEnroll` Type: String. Optional. Link to the institutions intent-to-enroll form. (To do: see `dateAccepted`.)
 - `linkOrientationChecklist` Type: String. Optional. Link to information about steps involved in orientation. (To do: see `dateAccepted`.)
 - `linkOrientationInfo` Type: String. Optional. Blah blah. (To do: see `dateAccepted`.)
 - `linkTourSignUp` Type: String. Optional. You get the idea. (To do: see `dateAccepted`.)
 - `linkVisitTips` Type: String. Optional. And again. (To do: see `dateAccepted`.)
 - `mediaCongrats` Type: String. Optional. Media used in dialog congratulation student on acceptance. (To do: see `dateAccepted`.)
 - `mediaMascot` Type: String. Optional. Media of the instutions mascot.
 - `messagingServiceSid` Type: String. Optional. A string used by Twilio to identify the messaging service of the institution.
 - `phoneFinAid` Type: String. Optional. Phone number to call at institution to learn about financial aid. (To do: see `dateAccepted`.)
 - `prependCounselorResponse`: Type: String. Optional. Prepends counselor response to emails, e.g. "Your officer replied to your question..."
 - `primaryBrandColor` Type: String. Optional. Primary colour representing the institution.
 - `promptFilter` Type: String. Optional.
 - `studentFieldMapping` Type: Object. Optional. Default value: empty object. Blackbox. 
 - `tuitionDueDate` Type: Date. Optional. Date by which stuent tuition is due. (To do, see `dateAccepted`.)

## Monitoring and Metrics examples

```
require("babel-register");
require('source-map-support/register');

const publishers = require('./lib/monitoring/metric_publishers');

let publisher = new publishers.MetricPublisher({});

(async function() {
   let result = await publisher.publish(1.0);
   console.log("Metric publisher test complete");
})(); // This is called an "immediately invoked function" in javascript. Helps to avoid promises in interactive mode.


const monitors = require('./lib/monitoring/monitors');

let hbeat_monitor = new monitors.HeartbeatMonitor({});

(async function() {
   let result = await hbeat_monitor.beat();
   console.log("Heartbeat monitor test complete");
})();


let event_monitor = new monitors.EventMonitor({});

(async function() {
   let result = await event_monitor.recordEvent();
   console.log("Event monitor test complete");
})();
```
