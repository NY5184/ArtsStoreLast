import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7020/orders", // Adjust base URL to match your backend
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/", // Endpoint to get all orders
    }),
    getOrderByUserId: builder.query({
      query: () => `/`, // Assuming you filter orders by user ID
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, ...rest }) => ({
        url: `/${orderId}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "DELETE",
      }),
    }),
    addItemToOrder: builder.mutation({
      query: ({ orderId, artId, quantity }) => ({
        url: "/add-item",
        method: "PUT",
        body: { orderId, artId, quantity },
      }),
    }),
    payOrder: builder.mutation({
      query: (orderId) => ({
        url: "/pay",
        method: "POST",
        body: { orderId },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByUserIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAddItemToOrderMutation,
  usePayOrderMutation,
} = orderApi;