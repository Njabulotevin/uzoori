"use client";

import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
// types

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const server_url = "https://295f-41-169-13-10.ngrok-free.app";


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: server_url,
    mode: "cors",
    credentials: "include",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Users", "Products", "Orders", "Notification", "Like", "Follow"],
  endpoints: (builder) => ({}),
});
