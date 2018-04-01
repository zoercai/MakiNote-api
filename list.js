import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "MakiNote",
    IndexName: "userId-url-index",
    KeyConditionExpression: "userId = :userId AND #siteUrl = :siteUrl",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
      ":siteUrl": event.queryStringParameters.url
    },
    ExpressionAttributeNames: {
      "#siteUrl": "url"
    }
  };

  try {
    console.log(params);
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}