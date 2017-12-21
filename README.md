# admithub-common
Common styles, templates, and library functions and classes for AdmitHub apps

## Schema

### BrandedColleges
Documents containing details about partner institutions.
Fields:
 - `aiSubject` Type: String. Required. A string used as part of
 - `abbr` Type: String. Optional. Abbreviated form of the institution's name.
 - `primaryBrandColor` Type: String. Optional. Primary colour representing the institution.
 - 
  animal: {type: String, optional: true}, // Panther
  collection: {type: String, optional: true},
  collegeId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  dateAccepted: {type: String, optional: true},
  dateScholarship: {type: String, optional: true},
  emailPrefix: {type: String, optional: true},
  facebookId: {type: String, optional: true},
  filterOn: {type: Boolean, optional: true},
  hashtag: {type: String, optional: true}, // include the hash
  infoGatheringBot: {type: String, optional: true}, //dialog scheduled after the initial dialog in an open bot
  intentDeadline: {type: Date, optional: true}, // june 1
  introKnownProspectBotPhoto: {type: String, optional: true, defaultValue: ''},
  linkAcceptAid: {type: String, optional: true},
  linkAdmit: {type: String, optional: true},
  linkCounselors: {type: String, optional: true},
  counselors: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  departments: {type: [Object], blackbox: true, optional: true, defaultValue: []},
  linkIncompleteApplication: {type: String, optional: true},
  linkFafsa: {type: String, optional: true},
  linkFinAid: {type: String, optional: true},
  linkIntentToEnroll: {type: String, optional: true},
  linkOrientationChecklist: {type: String, optional: true},
  linkOrientationInfo: {type: String, optional: true},
  linkTourSignUp: {type: String, optional: true},
  linkVisitTips: {type: String, optional: true},
  mediaCongrats: {type: String, optional: true},
  mediaMascot: {type: String, optional: true},
  messagingService: {type: String},
  messagingServiceSid: {type: String, optional: true},
  name: {type: String},
  oliName: {type: String},
  promptFilter: {type: String, optional: true},
  phoneFinAid: {type: String, optional: true},
  tuitionDueDate: {type: Date, optional: true}, // 8 -15
  disabledFeatures: {type: [String], defaultValue: []},
  dialogSettings: {type: new SimpleSchema({
    unknownStudentDialogBotOn: {type: String, optional: true},
    unknownStudentDialogBotOff: {type: String, optional: true},
    knownNonContactedStudentDialog: {type: String, optional: true},
    botOffDialog: {type: String, optional: true},
    createAndIntroDialog: {type: String, optional: true},
    botOffNoDialog: {type: Boolean, optional: true},
    finishedConversationDialog: {type: String, optional: true}
  }), optional: true},
  enabledFeatures: {type: [String], defaultValue: [], optional: true},
  studentFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  internalFieldMapping: {type: Object, blackbox: true, optional: true, defaultValue: {}},
  csvTransformPipeline: {type: [String], optional: true, defaultValue: []},
  prependCounselorResponse: {type: String, optional: true} // prepends counselor response to emails e.g. Your officer replied to your question:
}));

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
