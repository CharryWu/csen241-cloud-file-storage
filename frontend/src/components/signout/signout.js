// modules
import React, { useEffect } from "react";
import userPool from "../auth/cognitopool";
import { useNavigate } from "react-router-dom";

const signOut = () => {

    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser)
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    useNavigate("/");
};

export default signOut;