import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

export class AppBackend extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // save it as a const since we'll use it in a little bit
    const appTable = new dynamodb.Table(this, "AppTable", {
      //a unique key
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // use this instead of const, you'll see why in a moment
    this.handler = new lambda.Function(this, "AppHandler", {
      code: lambda.Code.fromAsset("lambda"),
      // the name of the method in your code that lambda will call
      // our file is called `appHandler.ts` and it `exports.handler`
      handler: "appHandler.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      // we need to pass the name of our table as env variable
      environment: {
        TABLE_NAME: appTable.tableName,
      },
    });

    appTable.grantReadWriteData(this.handler);
  }
}
