import { apiSlice } from "@/app/api/apiSlice";
import { Response } from "@/app/models/events";
import { Inotification } from "@/app/models/notifications";
let notification = "/notification/";
let like = "/like/";
let follower = "/follower/";

// ! test all.

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* Notifications
    // 1. GET NOTIFICATIONS FOR USER
    getNotificationForUser: builder.query<
      Response<Inotification[]>,
      { offset: number }
    >({
      query: ({ offset }) => `${notification}`,
      //! RECONG providesTags: [{ type: "Notification", id: "LIST" }],
    }),
    // 2. CHANGE NOTIFICATION SEEN STATUS
    changeNotificationStatus: builder.mutation<
      Response<Inotification[]>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${notification}${id}/?limit=100`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),

    // 3. DELETE NOTIFICATION
    deleteNotification: builder.query({
      query: ({ id }) => ({
        url: `${notification}${id}`,
        method: "DELETE",
      }),
    }),
    // * Likes
    //4.  CREATE LIKES. //todo: Test
    createLike: builder.query({
      query: ({ id }) => `${like}post/${id}/`,
    }),
    //5.  GET LIKES BY THE POST ID.
    getLikesById: builder.mutation({
      query: ({ id }) => ({
        url: `${like}`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: [{ type: "Like", id: "LIST" }],
    }),
    //6.  DELETE LIKE BY POST ID.
    deleteLikeByPostId: builder.mutation({
      query: ({ id }) => ({
        url: `${like}post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Like", id: "LIST" }],
    }),
    // * Follows
    // 7. CREATE A FOLLOW
    createFollow: builder.mutation({
      query: ({ id }) => ({
        url: `${follower}`,
        method: "POST",
        body: { userId: id },
      }),
      invalidatesTags: [{ type: "Follow", id: "LIST" }],
    }),
    // 8. get USER'S FOLLOWS
    getUserFollows: builder.query({
      query: ({ id }) => `${follower}user/${id}`,
    }),
    // 9. DELETE A FOLLOW
    undoFollow: builder.mutation({
      query: ({ id }) => ({
        url: `${follower}user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetNotificationForUserQuery,
  useChangeNotificationStatusMutation,
  useDeleteNotificationQuery,
  useCreateLikeQuery,
  useGetLikesByIdMutation,
  useDeleteLikeByPostIdMutation,
  useGetUserFollowsQuery,
  useCreateFollowMutation,
  useUndoFollowMutation,
} = notificationApiSlice;
