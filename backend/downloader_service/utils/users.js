// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const { Credential } = require('../routes/credential');
AWS = require("aws-sdk");

/*
AWS.config.update({
    accessKeyId: Credential.accessKeyId,
    secretAccessKey: Credential.secretAccessKey
});
*/
const client = new AWS.CognitoIdentityServiceProvider({
  region: Credential.region,

});
/** snippet-start:[javascript.v3.cognito-idp.actions.ListUsers] */
const listUsers = (PoolId) => {


  const input = { // ListUsersRequest
    UserPoolId: PoolId, // required
  };

  return client.listUsers().promise();
};
/** snippet-end:[javascript.v3.cognito-idp.actions.ListUsers] */

const getUserAttributes = (accessToken) => {

  return client.getUser({ // ListUsersRequest
    AccessToken: accessToken, // required
  }).promise();
}
module.exports = { listUsers, getUserAttributes };
