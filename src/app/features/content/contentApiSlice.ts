import { iPost } from "@/app/models/user";
import { apiSlice } from "../../api/apiSlice";
import { Response } from "@/app/models/events";
import { iComment } from "@/app/models/content";
import { iLike } from "./hooks/usePostInteraction";

export const contentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post",
    }),
    getPostById: builder.query<Response<iPost>, { postId: string }>({
      query: ({ postId }) => `/post/id/${postId}/`,
    }),
    getPostsByUserId: builder.query({
      query: (id: string) => `/post/?userId=${id}&limit=20`,
    }),
    // !url for getting posts for user
    getUserPosts: builder.query<Response<iPost[]>, { offset: number }>({
      query: ({ offset }) => `/post/content/?limit=20&offset=${offset}`,
    }),
    createPost: builder.mutation<
      Response<iPost>,
      { message: string; media: string[] }
    >({
      query: (payload) => ({
        url: "/post/",
        method: "POST",
        body: payload,
      }),
    }),
    postLike: builder.mutation<Response<iLike>, { postId: string }>({
      query: (payload) => ({
        url: "/like/",
        method: "POST",
        body: payload,
      }),
    }),
    postUnLike: builder.mutation<
      Response<{ postId: string }>,
      { postId: string }
    >({
      query: (payload) => ({
        url: `/like/post/${payload.postId}/`,
        method: "DELETE",
        body: payload,
      }),
    }),
    getPostComments: builder.query<Response<iComment[]>, { id: string }>({
      query: ({ id }) => `/comment/post/${id}/`,
    }),
    createComment: builder.mutation<
      Response<iComment>,
      { postId: string; message: string }
    >({
      query: (payload) => ({
        url: "/comment/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  usePostLikeMutation,
  usePostUnLikeMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useLazyGetUserPostsQuery,
  useLazyGetPostCommentsQuery,
} = contentApiSlice;
