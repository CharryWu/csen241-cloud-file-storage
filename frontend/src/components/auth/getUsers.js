// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    ListUsersCommand,
    CognitoIdentityProviderClient,
  } from "@aws-sdk/client-cognito-identity-provider";

import AWS from "aws-sdk";

console.log(process.env.REACT_APP_REGION_USER)
AWS.config.update({region:process.env.REACT_APP_REGION_USER});
var myCredentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId:process.env.REACT_APP_REGION_USER_POOL_ID
});
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.ListUsers] */
  const listUsers = ({ PoolId}) => {
    const client = new CognitoIdentityProviderClient({
        region: process.env.REACT_APP_REGION_USER,
        credentials: myCredentials
    });

    const input = { // ListUsersRequest
        UserPoolId: PoolId, // required
        AttributesToGet: [ // SearchedAttributeNamesListType
          "STRING_VALUE",
        ],
    };
  
    const command = new ListUsersCommand(input);
  
    return client.send(command);
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.ListUsers] */
  
  export { listUsers };