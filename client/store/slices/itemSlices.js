import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/marketplace",
    prepareHeaders: (headers) => {
      const userProfile = JSON.parse(localStorage.getItem("profile"));
      if (userProfile) {
        headers.set("Authorization", `Bearer ${userProfile.user.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (item) => {
        return {
          url: "/create-item",
          method: "POST",
          body: item,
        };
      },
    }),
    getItems: builder.query({
      query: () => {
        return {
          url: `/`,
          method: "GET",
        };
      },
    }),
    getItem: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateItemMutation, useGetItemsQuery, useGetItemQuery } =
  itemApi;
