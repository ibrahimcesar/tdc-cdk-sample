import { Handler, APIGatewayEvent } from "aws-lambda";
import { Seed } from "./ddbSeed";
import { Increment } from "./increment";

const headers = {
  "Content-Type": "application/json",
  "X-Clacks-Overhead": "GNU Terry Pratchett",
};

export const handler: Handler = async (event: APIGatewayEvent) => {
  console.log(JSON.stringify(event));

  await Seed();
  const update = await Increment();

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({
      update: update,
      body: event,
    }),
  };
};
