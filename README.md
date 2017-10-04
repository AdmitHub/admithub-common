# admithub-common
Common styles, templates, and library functions and classes for AdmitHub apps

##Monitoring and Metrics examples

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
