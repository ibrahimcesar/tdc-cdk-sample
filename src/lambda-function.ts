import { Handler, APIGatewayEvent } from 'aws-lambda';
import { UpdateItem } from './dynamodb/ddbUpdate';

const headers = {
  'Content-Type': 'application/json',
  'X-Clacks-Overhead': 'GNU Terry Pratchett',
};


export const handler: Handler = async (event: APIGatewayEvent) => {

  console.log(JSON.stringify(event));

  const update = await UpdateItem({
    TableName: process.env.TABLE_NAME,
    Key: {
      'pk': event.path
    },
    UpdateExpression: 'SET #hits = #hits + #hits_inc',
    ExpressionAttributeNames: {
      '#hits': 'hits',
    },
    ExpressionAttributeValues: {
      ":hits_inc": 1
    },
    ReturnConsumedCapacity: "NONE",
    ReturnValues: "ALL_NEW"
  });

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(event)
  }
}