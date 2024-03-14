import React from "react";
import {
  CognitoUserPool
} from "amazon-cognito-identity-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import userPool from "./auth/cognitopool";
//import { listUsers } from "./auth/getUsers";

const HomeComponent = () => {
  const userData = useSelector((state) => state.auth.userData);
  console.log(process.env.REACT_APP_REGION_USER_POOL_ID)
  //console.log(listUsers(process.env.REACT_APP_REGION_USER_POOL_ID))
  return (
    <main>
      <div className="">
        <div className="">
          <div className="container-fluid py-5 d-flex justify-content-between">
            <div>
              <h1 className="Greeting">Hi {userData.name}!</h1>
              <h1 className="display-5 fw-bold">Welcome to File Storage System!</h1>
              <p className="col-md-8 fs-4">
                <i>This website tries to be a private cloud on a public cloud.</i>
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                <a href="login" className="badge badge-primary">Getting started!</a> 
              </button>
            </div>
            <div className="">
              <img className="img-fluid rounded" src="cloud-computing.png"/>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
