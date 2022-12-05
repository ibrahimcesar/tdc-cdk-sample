import { UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./ddbdocClient";

export const UpdateItem = async (params: UpdateCommandInput) => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    return data;
  } catch (err) {
    console.error("Error", err);
  }
};
