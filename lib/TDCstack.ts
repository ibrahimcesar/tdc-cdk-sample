import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DynamoTable } from "./table";

import * as apigwt from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";

import * as path from "node:path";

const esbuildOptions = {
  bundling: {
    keepNames: true,
    minify: true,
    target: "es2020",
  },
};

export class TDCStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dDb = new DynamoTable(this, "Table");

    const fn = new lambdaNodeJs.NodejsFunction(this, "FunctionGet", {
      description: "Function created with CDK L3 Construct",
      entry: path.join(__dirname, "..", "src", "lambda-function.ts"),
      environment: {
        TABLE_NAME: dDb.table.tableName,
      },
      architecture: lambda.Architecture.ARM_64,
      memorySize: 2048,
      runtime: lambda.Runtime.NODEJS_18_X,
      tracing: lambda.Tracing.ACTIVE,
      ...esbuildOptions,
    });

    new apigwt.LambdaRestApi(this, "Endpoint", {
      handler: fn,
    });

    dDb.table.grantReadWriteData(fn);
  }
}
