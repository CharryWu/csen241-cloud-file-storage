// modules
import React, { useEffect } from "react";
import userPool from "../auth/cognitopool";
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";

const signIn = () => {

    const cognitoUser = userPool.getCurrentUser();
    const allUser = userPool.get
    console.log(cognitoUser)
    
    return cognitoUser
};

export default signIn;