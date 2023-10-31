import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    getPaymentMethods: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/paymentMethods`,
      }),
      keepUnusedDataFor: 5,
    }),
    getDeliveryMethods: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/deliveryMethods`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCities: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/cities`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaymentMethod: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/paymentMethod/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getDeliveryMethod: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/deliveryMethod/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCity: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/cities/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useGetPaymentMethodsQuery,
  useGetDeliveryMethodsQuery,
  useGetCitiesQuery,
  useGetPaymentMethodQuery,
  useGetDeliveryMethodQuery,
  useGetCityQuery,
} = orderApiSlice;
