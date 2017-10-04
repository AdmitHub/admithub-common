/*
	This module provides classes to monitor applications using metric publishers
*/

const metricPublishers = require('./metric_publishers');
const alarms = require('./alarms');

const MockMetricPublisher = metricPublishers.MockMetricPublisher;
const MetricPublisher = metricPublishers.MetricPublisher;

class HeartbeatMonitor {
  constructor({appName='testApp', appStage='staging', heartbeatName='testHeartbeat', period=60, isMock=false}) {
  	this.heartbeatName = heartbeatName;

  	let publisher = createPublisher({appName, appStage, metricName: heartbeatName, isMock});
		(async function() { 
			// beat() once to make sure the metric exists in CloudWatch before creating an alarm.
			await publisher.publish(1.0);
      if (!isMock){
			  await alarms.setHeartbeatAlarm({appName, appStage, heartbeatName, period});
      }
		})(); // This is called an "immediately invoked function" in javascript

		this.publisher = publisher;
  }

  async beat() {
  	this.publisher.publish(1.0);
  }
}

class EventMonitor {
  constructor({appName='testApp', appStage='staging', eventName='testEvent', isMock=false}) {
  	this.eventName = eventName;

  	let publisher = createPublisher({appName, appStage, metricName: eventName, isMock});
  	(async function() {
  		// publish() once to make sure the metric exists in CloudWatch before creating an alarm.
	  	await publisher.publish(0.0);
      if (!isMock){
	  	  await alarms.setEventAlarm({appName, appStage, eventName});
      }
  	})(); // This is called an "immediately invoked function" in javascript

  	this.publisher = publisher;
  }

  async recordEvent() {
  	this.publisher.publish(1.0);
  }
}

function createPublisher({appName, appStage, metricName, isMock}) {
	let publisher;
	if (isMock) {
	  publisher = new MockMetricPublisher({appName, appStage, metricName});
	} else {
	  publisher = new MetricPublisher({appName, appStage, metricName});
	}

	return publisher;
};

module.exports.HeartbeatMonitor = HeartbeatMonitor;
module.exports.EventMonitor = EventMonitor;
