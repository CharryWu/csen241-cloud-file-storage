// modules
import React, { useEffect } from "react";
import userPool from "../auth/cognitopool";

const signOut = () => {

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    navigate("/");
};

export default signOut;