/*
	This module provides classes to publish general data to (currently) CloudWatch
*/

const cloudwatch = require('./cloudwatch');

class MockMetricPublisher {
  constructor({awsConfigFile = AWS_CONFIG_FILENAME,
      			   appName ='testApp',
      			   appStage = 'staging',
      			   metricName = 'testMetric',
      			   unit = 'Count'}) { }

  async publish(value) { }
};

class MetricPublisher {
  constructor( {appName ='testApp',
      			    appStage = 'staging',
      			    metricName = 'testMetric',
      			    unit = 'Count'} ) {

  	let namespace = appName + '/' + appStage;
  	this.namespace = namespace;
  	this.metricName = metricName;
  	this.unit = unit;

    this.cloudwatchClient = cloudwatch.getCloudWatchClient({});

  }

  async publish(value) {
  	let params = {
  	  MetricData: [
  	    {
  	      MetricName: this.metricName,
  	      Unit: this.unit,
  	      Value: value
  	    },
  	  ],
  	  Namespace: this.namespace
  	};

  	let result;
  	try {
  	  result = await this.callPutMetricData(params);
  	} catch(err) {
  	  console.log("Got an error when trying to publish metric to cloud watch");
  	  console.log(err, err.stack);
  	}

  	return result;
  }

  /* This exist as a separate function because aws-sdk doesn't conform to the promise
     specification (or something like that) and we can't use promises or async/await 
     without doing this.
  */
  async callPutMetricData(params) {
	  return new Promise( (resolve, error) => {
	    this.cloudwatchClient.putMetricData(params, (err, data) => {
	      if (err) {
		      error(err);
        } else {
    	    resolve(data);
	      }
	   })
	  });
  }
}

module.exports.MockMetricPublisher = MockMetricPublisher;
module.exports.MetricPublisher = MetricPublisher;
