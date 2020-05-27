import * as cdk from '@aws-cdk/core';
import {Secret} from '@aws-cdk/aws-secretsmanager';
import {Code, Function, Runtime, Version} from '@aws-cdk/aws-lambda';
import * as path from "path";

export class InitTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secret = new Secret(this, 'secret')
    const lambda = new Function(this, 'lambda', {
      runtime: Runtime.PYTHON_3_8,
      handler: 'lambda_function.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambda-function')),
      environment: {
        SECRET_ARN: secret.secretArn
      }
    })
    new Version(this, "v1", {
      lambda,
      provisionedConcurrentExecutions: 1
    })
    secret.grantRead(lambda)
  }
}
