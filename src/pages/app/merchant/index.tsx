import {
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateMerchantMutation,
  useVerifyEmailMutation,
  useVerifyUserMutation,
} from "@/app/features/accounts/accountApiSlice";
import { UserResponse, UsersResponse } from "@/app/features/accounts/types";
import { usePostImageMutation } from "@/app/features/product/productApiSlice";
import React from "react";
import { useSetState, useStackState } from "rooks";

/**
 * @Feed
 * user data ✅
 * user related posts
 * user forgot password ✅
 * update user ✅
 */



export default function index() {
  return (
    <div className="space-y-1">


      <p>User by Id</p>
     
    </div>
  );
}
