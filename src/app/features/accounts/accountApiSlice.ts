import { Response } from "@/app/models/events";
import { ImerchantUser, IpublicUser } from "@/app/models/user";
import { apiSlice } from "../../api/apiSlice";
import {
  GetAllUsersParams,
  UserType,
  UserPassword,
  UsersResponse,
  UserResponse,
  GetUserResponse,
} from "./types";

// todo: creating types, login, and creating an account.

//*  Types

/**
 * USER requests
 * @login login users
 * @signup creating account: incl Stylist, Merchant, and General
 */

export function convertSecondsToTime(seconds: number): string {
  const date = new Date();
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

// * convert date string to seconds
function convertTimeToSeconds(timeString: string): number {
  const [hours = "00", minutes = "00", seconds = "00"] = timeString
    .split(":")
    .map(Number);
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // SIGN UP GENERAL USER, STYLIST USER, & MERCHANT USER
    signUp: builder.mutation<UserResponse, UserType>({
      query: (payload) => ({
        url: "/user/",
        method: "POST",
        body: payload,
      }),
    }),
    // UPDATE USER ACCOUNT
    updateUser: builder.mutation<UserResponse, UserType>({
      query: (payload) => {
        let convertedPayload;
        if (payload.accountType === "merchant") {
          convertedPayload = {
            ...payload,
            weekdayStart: convertTimeToSeconds(payload?.weekdayStart as string),
            weekdayEnd: convertTimeToSeconds(payload?.weekdayEnd as string),
            saturdayStart: convertTimeToSeconds(
              payload?.saturdayStart as string
            ),
            saturdayEnd: convertTimeToSeconds(payload?.saturdayEnd as string),
            sundayStart: convertTimeToSeconds(payload?.sundayStart as string),
            sundayEnd: convertTimeToSeconds(payload?.sundayEnd as string),
          };
        } else {
          convertedPayload = payload;
        }

        return {
          url: "/user/",
          method: "PATCH",
          body: convertedPayload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    // LOGIN USER // * solved { status: string; data: User } as return type instead of void
    follow: builder.mutation<UserResponse, { userId: string }>({
      query: (credentials) => ({
        url: "/follower/",
        method: "POST",
        body: credentials,
      }),
    }),
    unFollow: builder.mutation<UserResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `/follower/user/${userId}/`,
        method: "DELETE",
        body: {},
      }),
    }),
    // CHANGE PROFILE PICTURE
    uploadProfileImgae: builder.mutation<
      Response<IpublicUser>,
      { displayImageUrl: string }
    >({
      query: (payload) => ({
        url: "/user/",
        method: "PATCH",
        body: payload,
      }),
    }),
    // FOLLOW USER

    login: builder.mutation<UserResponse, UserType>({
      query: (credentials) => ({
        url: "/user/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    // VERIFY USER EMAIL
    verifyEmail: builder.mutation<UserResponse, { otp: number }>({
      query: (payload) => ({
        url: "/user/verify/",
        method: "POST",
        body: payload,
      }),
    }),
    // VERIFY USER
    verifyUser: builder.mutation({
      query: ({ otp }) => ({
        url: "/user/verify/",
        method: "POST",
        body: otp,
      }),
    }),

    // FORGOT USER:
    forgot: builder.mutation<UsersResponse, UserType>({
      query: (email) => ({
        url: `/user/forgot/`,
        method: "POST",
        body: email,
      }),
    }),
    // GET USER BY USERNAME
    getUserByUsername: builder.query<
      Response<IpublicUser>,
      { username: string; userId: string }
    >({
      query: ({ username, userId }) =>
        `/user/username/${username}/?userId=${userId}`,
    }),
    // FORGOT USER & SET PASSWORD
    forgotCheck: builder.mutation({
      query: (payload) => ({
        url: "/user/forgot/check/",
        method: "POST",
        body: payload,
      }),
    }),
    // FORGOT USER GET TOKEN
    changePassword: builder.mutation<UserResponse, UserPassword>({
      query: ({ oldPassword, password }) => ({
        url: "/user/change/pass/",
        method: "PATCH",
        body: { oldPassword, password },
      }),
    }),
    // FORGOT USER GET TOKEN
    resetPassword: builder.mutation<UserResponse, UserPassword>({
      query: ({ token, password }) => {
        return {
          url: `/user/forgot/${token}/`,
          method: "POST",
          body: { password },
        };
      },
    }),
    // FORGOT USER GET TOKEN
    updateMerchant: builder.mutation<UserResponse, UserType>({
      query: (payload) => ({
        url: "/forgot/check/",
        method: "POST",
        body: payload,
      }),
    }),
    //GET  users[] and state
    // todo: limit and offset
    getAllUsers: builder.query<UsersResponse, GetAllUsersParams>({
      query: ({ accountType, offset, limit }) =>
        `/user/?accountType=${accountType}&offset=${offset}&limit=${limit}`,
    }),
    getPeopleYouMayKnow: builder.query<
      Response<IpublicUser[]>,
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `/user/mustknow/?limit=${limit}&offset=${offset}`,
    }),
    // Get user by Id
    getUserById: builder.query<GetUserResponse, { id: string }>({
      query: (payload) => `/user/id/${payload.id}/`,
      // transformResponse: (responseData: UserResponse) => {
      //   const { data } = responseData;

      //   const transformedData = {
      //     ...data,
      //     weekdayStart: convertSecondsToTime(data.weekdayStart as number),
      //     weekdayEnd: convertSecondsToTime(data.weekdayEnd as number),
      //     saturdayStart: convertSecondsToTime(data.saturdayStart as number),
      //     saturdayEnd: convertSecondsToTime(data.saturdayEnd as number),
      //     sundayStart: convertSecondsToTime(data.sundayStart as number),
      //     sundayEnd: convertSecondsToTime(data.sundayEnd as number),
      //   };
      //   return { ...responseData, data: transformedData };
      // },
    }),

    loadUserWithCookie: builder.query<Response<IpublicUser>, {}>({
      query: () => ({
        url: "/user/load/",
        method: "GET",
      }),
    }),
    logout: builder.query<Response<IpublicUser>, {}>({
      query: () => ({
        url: "/user/signout/",
        method: "GET",
      }),
    }),
  }),
});

// selector
export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useVerifyUserMutation,
  useForgotMutation,
  useResetPasswordMutation,
  useForgotCheckMutation,
  useChangePasswordMutation,
  useUpdateMerchantMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useLoadUserWithCookieQuery,
  useFollowMutation,
  useGetUserByUsernameQuery,
  useGetPeopleYouMayKnowQuery,
  useUploadProfileImgaeMutation,
  useUnFollowMutation,
  useLazyGetPeopleYouMayKnowQuery,
} = accountApiSlice;

// ! getAllUSers
// providesTags: (result) =>
//         result
//           ? [
//               ...result?.data?.map(
//                 ({ id }) => ({ type: "Users", id } as const)
//               ),
//               { type: "Users", id: "LIST" },
//             ]
//           : [{ type: "Users", id: "LIST" }],

// !getUSerById
// providesTags: (result, error, id) => [{ type: "Users", id }],
