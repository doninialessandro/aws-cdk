/// <reference types="aws-sdk" />
import AWS = require("aws-sdk");
// the table name that we get from an env variable
const tableName = process.env.TABLE_NAME || "";
// for interacting with dynamoDB from JavaScript / nodeJS
const dynamo = new AWS.DynamoDB.DocumentClient();

const createResponse = (
  body: string | AWS.DynamoDB.DocumentClient.ItemList,
  statusCode = 200,
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
    },
    body: JSON.stringify(body, null, 2),
  };
};
// DynamoDB Scan operation scans and returns all of the items in the db
const getAllData = async () => {
  const scanResult = await dynamo
    .scan({
      TableName: tableName,
    })
    .promise();

  return scanResult;
};
// async function that response to apiGateway events
exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
  try {
    const { httpMethod, body: requestBody } = event;

    if (httpMethod === "OPTIONS") {
      return createResponse("OK");
    }

    if (httpMethod === "GET") {
      // GET request
      const response = await getAllData();

      return createResponse(response.Items || []);
    }
    return createResponse(
      `We only accept GET requests for now, not ${httpMethod}`,
      500,
    );
  } catch (error) {
    console.log(error);
    return createResponse(error, 500);
  }
};
