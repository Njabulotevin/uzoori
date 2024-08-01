import { apiSlice } from "@/app/api/apiSlice";
import { IpublicUser } from "@/app/models/user";
import { UserType, Invites, InviteResponse } from "../accounts/types";
import { Response } from "@/app/models/events";
import { IassistantInvite } from "../notifications/hooks/useAssistantInvitation";

let assistantInvite = "/assistant-invitation/";
let assistantUser = "/assistant-user/";

export const merchantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // *  MERCHANT.
    // CREATE ASSISTANT INVITATION AS MERCHANT
    inviteAssistantAsMerchant: builder.mutation<InviteResponse, UserType>({
      query: (email) => ({
        url: `${assistantInvite}`,
        method: "POST",
        body: email,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    // GET ALL ASSISTANT INVITATIONS AS A MERCHANT
    getAssistantAsMerchant: builder.query<
      InviteResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) =>
        `${assistantInvite}?limit=${limit}&offset=${offset}`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteInviteAsMerchant: builder.mutation<InviteResponse, UserType>({
      query: ({ id }) => ({
        url: `${assistantInvite}/id/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    // CREATE ASSISTANT USER AS AN ASSISTANT
    acceptInvite: builder.mutation<InviteResponse, UserType>({
      query: ({ id }) => ({
        url: `${assistantUser}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Users"],
    }),
    // GET ALL ASSISTANT USERS THAT BELONG TO THE PARAM ID OF MERCHANT
    getAllAssistantLinkedToMerchant: builder.query<
      Response<{ id: string; user: IpublicUser }[]>,
      { id: string }
    >({
      query: ({ id }) => `${assistantUser}merchant/id/${id}/`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteAssistantAsMerchant: builder.query({
      query: ({ id }) => ({
        url: `${assistantUser}merchant/id/${id}`,
        method: "DELETE",
      }),
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    // *  ASSISTANT.
    // GET ASSISTANT INVITE AS A ASSISTANT
    getInvitesAsAssistant: builder.query<
      Response<IassistantInvite>,
      { id: string }
    >({
      query: ({ id }) => `${assistantInvite}/id/${id}`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    // GET ALL ASSISTANT INVITATIONS AS A ASSISTANT
    getAllInvitesAsAssistant: builder.query<Response<IassistantInvite[]>, {}>({
      query: () => `${assistantInvite}user/`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    // DELETE SPECIFIC ASSISTANT INVITATION AS A ASSISTANT
    deleteInviteAsAssistant: builder.mutation<Invites, Partial<Invites>>({
      query: ({ id }) => ({
        url: `${assistantInvite}/decline/id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteAssistantUserAsAssistant: builder.mutation({
      query: ({ id }) => ({
        url: `${assistantUser}user/id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAssistantAsMerchantQuery,
  useGetAllAssistantLinkedToMerchantQuery,
  useGetInvitesAsAssistantQuery,
  useGetAllInvitesAsAssistantQuery,
  useAcceptInviteMutation,
  useInviteAssistantAsMerchantMutation,
  useDeleteInviteAsMerchantMutation,
  useDeleteInviteAsAssistantMutation,
  useDeleteAssistantAsMerchantQuery,
  useDeleteAssistantUserAsAssistantMutation,
} = merchantApiSlice;
