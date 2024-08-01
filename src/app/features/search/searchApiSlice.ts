import { iPost, IpublicUser } from "@/app/models/user";
import { apiSlice } from "../../api/apiSlice";
import { Iproduct } from "@/app/models/product";
import { Response } from "@/app/models/events";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchPost: builder.query<Response<iPost[]>, { q: string }>({
      query: ({ q }) => encodeURI(`/post/search/?q=${q}`),
    }),
    searchProduct: builder.query<Response<Iproduct[]>, { q: string }>({
      query: ({ q }) => encodeURI(`/product/search/?q=${q}`),
    }),
    searchUser: builder.query<Response<IpublicUser[]>, { q: string }>({
      query: ({ q }) => encodeURI(`/user/search/?q=${q}`),
    }),
  }),
});

export const {
  useSearchPostQuery,
  useSearchProductQuery,
  useSearchUserQuery,
  useLazySearchUserQuery,
} = searchApiSlice;
