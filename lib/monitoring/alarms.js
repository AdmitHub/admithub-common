/*
	This module provides classes to create alarms for (currently) CloudWatch
*/

const cloudwatch = require('./cloudwatch');

const cloudwatchClient = cloudwatch.getCloudWatchClient({});

// These maps are here to communicate the options, decouple AWS specific names, and, shorten some names
const comparisonOpMap = {
  greaterThan: 'GreaterThanThreshold',
  greaterThanOrEqual: 'GreaterThanOrEqualToThreshold',
  lessThan: 'LessThanThreshold',
  lessThanOrEqual: 'LessThanOrEqualToThreshold'
}

const statisticMap = {
  sampleCount: 'SampleCount',
  average: 'Average',
  sum: 'Sum',
  minimum: 'Minimum',
  maximum: 'Maximum'
}

async function setEventAlarm({appName='testApp', appStage='staging', eventName='testEvent' }) {
  let namespace = appName + '/' + appStage;
  let metricName = eventName;
  let alarmName = eventName;

  return setMetricAlarm({
                          namespace,
                          metricName,
                          alarmName,
                          threshold: 0.0,
                          comparisonOperator: 'greaterThan',
                          isMissingDataBreaching: false,
                          notifyOnOkay: false,
                          notifyOnInsufficient: false
                        });
};

async function setHeartbeatAlarm({appName='testApp', appStage='staging', heartbeatName='testHeartbeat', period=1}) {
  let namespace = appName + '/' + appStage;
  let metricName = heartbeatName;
  let alarmName = metricName;

  return setMetricAlarm({namespace, metricName, alarmName, period});
}

// Main adapter to CloudWatch alarms
async function setMetricAlarm({
                                namespace='testNamespace',
                                metricName='testMetric',
                                alarmName='testAlarm',
                                threshold=1.0,
                                period=1.0,
                                comparisonOperator='lessThan',
                                statistic='sum',
                                isMissingDataBreaching=true,
                                notifyOnInsufficient=true,
                                notifyOnOkay=true
                              }) {
  if (!comparisonOpMap[comparisonOperator]){
    throw new Error(`Comparison operator '${comparisonOperator}'' is not a valid operator.`);
  }

  if (!statisticMap[statistic]){
    throw new Error(`Statistic '${statistic}'' is not a valid statistic.`);
  }

  let insuffActions = notifyOnInsufficient ? [ cloudwatch.ADMITHUB_DEV_SRN, ] : [];
  let okayActions = notifyOnOkay ? [ cloudwatch.ADMITHUB_DEV_SRN, ] : [];
  let treatMissingData = isMissingDataBreaching ? 'breaching': 'notBreaching';

  /* @HACK AWS CloudWatch reads periods as minutes if isMissingDataBreaching otherwise
     they get read as seconds.
  */
  period = isMissingDataBreaching ? period : period*60;

  let params = {
	  AlarmName: alarmName,
	  ComparisonOperator: comparisonOpMap[comparisonOperator],
	  EvaluationPeriods: 1,
	  MetricName: metricName,
	  Namespace: namespace,
	  Period: period,
	  Threshold: threshold,
	  ActionsEnabled: true,
	  AlarmActions: [
	    cloudwatch.ADMITHUB_DEV_SRN,
	  ],
	  AlarmDescription: alarmName,
    InsufficientDataActions: insuffActions,
	  OKActions: okayActions,
	  Statistic: statisticMap[statistic],
	  TreatMissingData: treatMissingData
	};

  let result;
  try {
    result = await callPutMetricAlarm(params);
  } catch(err) {
    console.log("Got an error when trying to create a metric alarm in cloud watch");
    console.log(err, err.stack);
  }

  return result;
}

/* This exist as a separate function because aws-sdk doesn't conform to the promise
   specification (or something like that) and we can't use promises or async/await 
   without doing this.
*/
async function callPutMetricAlarm(params) {
  return new Promise( (resolve, error) => {
    cloudwatchClient.putMetricAlarm(params, (err, data) => {
      if (err) {
        error(err);
      } else {
        resolve(data);
      }
   })
  });
}

module.exports.setEventAlarm = setEventAlarm;
module.exports.setHeartbeatAlarm = setHeartbeatAlarm;
module.exports.setMetricAlarm = setMetricAlarm;
