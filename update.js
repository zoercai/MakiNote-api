import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "MakiNote",
    Key: {
        "id": event.pathParameters.id,
        "url": event.queryStringParameters.url
    },
    UpdateExpression: "SET content = :content, updated = :updated",
    ExpressionAttributeValues: {
        ":updated": new Date().getTime(),
        ":content": data.content ? data.content : null
      }
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
      console.log(e);
    callback(null, failure({ status: false }));
  }
}