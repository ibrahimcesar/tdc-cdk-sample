import { UpdateItem } from "./dynamodb/ddbUpdate";

async function Increment() {
  const inc = await UpdateItem({
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: "hits",
    },
    UpdateExpression: "SET #hits = #hits + :hits_inc",
    ExpressionAttributeNames: {
      "#hits": "hits",
    },
    ExpressionAttributeValues: {
      ":hits_inc": 1,
    },
    ReturnConsumedCapacity: "NONE",
    ReturnValues: "ALL_NEW",
  });

  return inc;
}

export { Increment };
