import { apiSlice } from "@/app/api/apiSlice";
import { Response, iEvent, Order } from "@/app/models/events";

let order = "/order/";
let orderProduct = "/order-product/";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* Order.
    // 1. CREATE UNASSISTED GOOD ORDER
    ugOrder: builder.mutation({
      query: (payload) => ({
        url: "/order/ug/",
        method: "POST",
        body: payload,
      }),
    }),
    // 2. CREATE ASSISTED SERVICE ORDER
    asOrder: builder.mutation({
      query: (payload) => ({
        url: "/order/as/",
        method: "POST",
        body: payload, // it an array.
      }),
    }),
    // 3. GET ORDER FOR THE USER THAT PURCHASED
    getAllOrder: builder.query<
      Response<Order[]>,
      { limit: number; offset: number; orderType?: "AS" | "UG" }
    >({
      query: ({ limit, offset, orderType }) =>
        `${order}user/?limit=${limit}&orderType=${orderType}`,
    }),
    getAllMerchantOrder: builder.query<
      Response<Order[]>,
      { limit: number; offset: number; orderType?: "AS" | "UG" }
    >({
      query: ({ limit, offset, orderType }) =>
        `${order}merchant/?limit=${limit}&offset=${offset}&orderType=${orderType}`,
    }),
    //  4. UPDATE ORDER STATUS TO COMPLETED
    updateOrderStatus: builder.mutation<
      Response<string>,
      { pin: number; id: string }
    >({
      query: ({ pin, id }) => ({
        url: `${order}completed/id/${id}/`,
        method: "PATCH",
        body: { pin: pin },
      }),
    }),
    //* Order product [EVENTS].
    // 1. GET AVAILABLE PRODUCT USERS(COMES WITH USER OBJECT)
    getOrderProductUsers: builder.query({
      query: ({ date, productId, timeStart }) =>
        `${orderProduct}as/productuser/${productId}/${date}/${timeStart}`,
      //! providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    // 2. GET EVENTS FOR ASSISTANT BETWEEN TWO DATES AS ASSISTANT
    getEventsForAssistantBetweenTwoDatesAsAssistant: builder.query<
      Response<iEvent[]>,
      { fromDate: number; toDate: number }
    >({
      query: ({ fromDate, toDate }) =>
        `${orderProduct}as/assistant/date/${fromDate}/${toDate}/`,
      //! providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    // 3. GET EVENTS FOR ASSISTANT BETWEEN TWO DATES AS MERCHANT
    getEventsForAssistantBetweenTwoDatesAsMerchant: builder.query<
      Response<iEvent[]>,
      { fromDate: number; toDate: number; id: string }
    >({
      query: ({ fromDate, toDate, id }) =>
        `${orderProduct}as/merchant/${id}/${fromDate}/${toDate}/`,
      //! providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    // 4. GET EVENTS FOR BUYER
    getEventsForBuyers: builder.query<Response<iEvent[]>, string>({
      query: () => `${orderProduct}general/`,
      //! providesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useAsOrderMutation,
  useUgOrderMutation,
  useUpdateOrderStatusMutation,
  useGetOrderProductUsersQuery,
  useGetAllMerchantOrderQuery,
  useGetEventsForAssistantBetweenTwoDatesAsAssistantQuery,
  useGetEventsForAssistantBetweenTwoDatesAsMerchantQuery,
  useGetEventsForBuyersQuery,
} = productApiSlice;
