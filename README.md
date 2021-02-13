This is a simple serverless application built with [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) using Typescript.

> :warning: **This is a learning project**, some best practices are out of scope
> and the payment function works in test mode.

## Prerequisites

- Be sure to have an AWS account and a [AWS IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with the right privileges.
- Install AWS CDK by running `npm install -g aws-cdk`

Once you have deployed your service, be sure to to set the right address in you frontend toe reach it. To do that go to [`App.js`](./frontend/src/App.js) and set the right url inside fetchData function. I didn't set any env variable because I was a bit lazy that day, sorry 🙇🏻.

## Useful commands 

> :warning: **IMPORTANT**: Run the followin commands from backend folder

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Services involved

The services involved in the following projects are:

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [API Gateway](https://aws.amazon.com/api-gateway/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Amazon S3](https://aws.amazon.com/s3/) 

### Credits
🥚 Inspired by [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit) on [egghead](https://egghead.io/)

