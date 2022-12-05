import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { RemovalPolicy, PhysicalName } from 'aws-cdk-lib';

export class DynamoTable extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, 'DdbTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      contributorInsightsEnabled: true,
      pointInTimeRecovery: true,
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: PhysicalName.GENERATE_IF_NEEDED,
    })
  }
};
