import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./ddbdocClient";

export const PutItem = async (params: PutCommandInput) => {
  return await ddbDocClient.send(new PutCommand(params));
};
