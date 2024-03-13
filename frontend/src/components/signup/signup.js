// modules
import React, { useEffect } from "react";
import {
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import cognito from '../../api/cognito'
import userPool from "../auth/cognitopool";

// styling
import "./signup.scss";

console.log(cognito)

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const username = values.name.trim();
    const email = values.email.trim();
    const password = values.password.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: username,
      }),
    ];
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("call result: ", result);
      navigate("/login");
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .min(8, "Password is too short. There should be 8 chars minimum."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <div className="signup__container">
        <div className="signup__form" onSubmit={formik.handleSubmit}>
          <h1>Sign Up</h1>
          <div className="signup__fieldName" htmlFor="name">
            Name
          </div>
          <input
            className="signup__inputField"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="signup__error">{formik.errors.name}</div>
          ) : null}

          <div className="signup__fieldName" htmlFor="email">
            Email Address
          </div>
          <input
            className="signup__inputField"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="signup__error">{formik.errors.email}</div>
          ) : null}

          <div className="signup__fieldName" htmlFor="password">
            Password
          </div>
          <input
            className="signup__inputField"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="signup__error">{formik.errors.password}</div>
          ) : null}

          {/* <div className="signup__fieldName" htmlFor="confirmPassword">
            Confirm Password
          </div>
          <input
            className="signup__inputField"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="signup__error">{formik.errors.confirmPassword}</div>
          ) : null} */}

          <button
            className="signup__submitButton"
            name="Hello"
            onClick={() => handleSubmit(formik.values)}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};