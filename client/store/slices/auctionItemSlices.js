import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auctionApi = createApi({
  reducerPath: "auctionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/auctions",
    prepareHeaders: (headers) => {
      const userProfile = JSON.parse(localStorage.getItem("profile"));
      if (userProfile) {
        headers.set("Authorization", `Bearer ${userProfile.user.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createAuctionItem: builder.mutation({
      query: (item) => {
        return {
          url: "/create-auction-item",
          method: "POST",
          body: item,
        };
      },
    }),
    getAuctionItems: builder.query({
      query: () => {
        return {
          url: `/`,
          method: "GET",
        };
      },
    }),
    getAuctionItem: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateAuctionItemMutation,
  useGetAuctionItemsQuery,
  useGetAuctionItemQuery,
} = auctionApi;
