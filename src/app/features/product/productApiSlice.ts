import { apiSlice } from "@/app/api/apiSlice";
import { ProductIdType, ProductType, ProductsResponseType } from "./types";
import { UserResponse } from "../accounts/types";
import { Response } from "@/app/models/events";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // * Product
    //1. CREATE PRODUCT.
    createProduct: builder.mutation<ProductsResponseType, ProductType>({
      query: (payload) => ({
        url: "/product/",
        method: "POST",
        body: payload,
      }),
    }),
    //2. UPDATE PRODUCT.
    //* issue_65: 400 Not available I have added and remove '/'
    updateProduct: builder.mutation<ProductsResponseType, ProductType>({
      query: ({ id, ...payload }) => ({
        url: `/product/id/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    //3. MULTIPLE PRODUCT.
    multipleProducts: builder.mutation<ProductsResponseType, ProductType>({
      query: (payload) => ({
        url: "/product/multiple/",
        method: "PATCH",
        body: payload,
      }),
    }),
    getOwnerProducts: builder.query<ProductsResponseType, void>({
      query: () => ({
        url: "/product/owner/",
      }),
    }),
    getUserProducts: builder.query<ProductsResponseType, { id: string }>({
      query: ({ id }) => ({
        url: `/product/?userId=${id}`,
      }),
    }),
    // GET PRODUCTS.
    // * issue_65: infinite scroll is needed to request data as you scroll down.
    // todo: query string - userId, collectionType*, name, limit ( - 10, des by cred@date) , offset (order id)
    // todo: first without offset, second with offset<timeStamp> - infinite scroll.
    getAllProduct: builder.query<ProductsResponseType, void>({
      query: () => `/product/`,
    }),
    // DELETE PRODUCT.
    deleteProduct: builder.mutation<ProductsResponseType, ProductIdType>({
      query: ({ id }) => ({
        url: `/product/id/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "List" }],
    }),
    productUser: builder.mutation<
      UserResponse,
      { productId: string; userId: string }
    >({
      query: (payload) => ({
        url: "/product-user/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Products", id: "List" }],
    }),
    postImage: builder.mutation<Response<string[]>, FormData>({
      query: (payload) => ({ url: "/upload/", method: "POST", body: payload }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useGetOwnerProductsQuery,
  useDeleteProductMutation,
  useMultipleProductsMutation,
  useProductUserMutation,
  usePostImageMutation,
  useGetUserProductsQuery,
} = productApiSlice;

//  ! getAllProducts ----------------
// providesTags: (result) =>
// result
//   ? [
//       ...result?.data?.map(
//         ({ id }) => ({ type: "Products", id } as const)
//       ),
//       { type: "Products", id: "LIST" },
//     ]
//   : [{ type: "Products", id: "LIST" }],
