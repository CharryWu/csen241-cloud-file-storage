// modules
import React, { useEffect } from "react";
import userPool from "../auth/cognitopool";
import { useNavigate } from "react-router-dom";

const checkLogIn = () => {

    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser)
    if (cognitoUser == null) {
        useNavigate("/login");
    }
};

export default checkLogIn;