import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

type errorType = {
  status: number;
  data: { data: string; status: string };
};

export type InputErrorType = {
  message: string;
  tags: Array<string>;
};

export default function AuthErrorHandling(
  error: FetchBaseQueryError
): InputErrorType {
  let returnError: InputErrorType = { message: "", tags: [] };

  if (typeof error.status === "number") {
    const err = error as errorType;

    const { status, data } = err;
    console.log(err.status);
    switch (data.data) {
      case "Email must be a valid email address":
        returnError.message = "Email must be a valid email address";
        returnError.tags.push("email");
        break;
      case "Incorrect Email Or Password":
        returnError.message = "Incorrect Email Or Password";
        returnError.tags = ["email", "password"];
      break;
      case "User Already Exists":
        returnError.message = "User Already Exists";
        returnError.tags = ["email", "username", "name"];
      break;
      default:
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
    }
  } else {
    switch (error.status) {
      case "FETCH_ERROR":
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
      case "CUSTOM_ERROR":
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
      case "PARSING_ERROR":
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
      case "TIMEOUT_ERROR":
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
      default:
        returnError = {
          message: "Oops, something went wrong. Please try again later",
          tags: [],
        };
    }
  }

  return returnError;
}
