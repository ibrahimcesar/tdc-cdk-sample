import { PutItem } from "./dynamodb/ddbPut";

async function Seed() {
  try {
    await PutItem({
      TableName: process.env.TABLE_NAME,
      Item: {
        pk: "hits",
        hits: 0,
      },
      ConditionExpression: "attribute_not_exists(hits)",
    });
  } catch (error) {
    console.log(error);
  }
}

export { Seed };
