import * as cdk from '@aws-cdk/core'
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import { AppBackend } from './app-backend'

export class ServerlessAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Constructor
    const appBackend = new AppBackend(this, 'AppBackend')

    // API Gateway
    new apiGateway.LambdaRestApi(this, 'Endpoint', {
      handler: appBackend.handler,
    })

    // Bucket S3 for the application
    const appBucket = new s3.Bucket(this, 'AppBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    })

    new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
      destinationBucket: appBucket,
      sources: [s3Deployment.Source.asset('../frontend/build')],
    })

    new cdk.CfnOutput(this, 'WebsiteAddress', {
      value: appBucket.bucketWebsiteUrl,
    })
  }
}
