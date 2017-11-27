const AWS = require('aws-sdk');
const fs = require('fs');

const AWS_CONFIG_FILENAME = './aws-conf.json';
const AWS_REGION = 'us-east-1';

module.exports.ADMITHUB_DEV_SRN = 'arn:aws:sns:us-east-1:962178857523:ai-matcher-dev';

module.exports.getCloudWatchClient = ({awsConfigFile = AWS_CONFIG_FILENAME}) => {
  let awsConfig;
  if (fs.existsSync(__dirname + '/' + awsConfigFile)) {
    awsConfig = require(AWS_CONFIG_FILENAME);
  } else if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    awsConfig = {
  	  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  	  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY
  	};
  } else {
	  throw new Error(`No AWS config in file ${AWS_CONFIG_FILENAME} or in environment variables`);
  }

  AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
	  secretAccessKey: awsConfig.secretAccessKey,
	  region: AWS_REGION
	});

  return new AWS.CloudWatch({});
}
