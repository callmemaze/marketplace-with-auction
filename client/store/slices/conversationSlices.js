import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const convoApi = createApi({
  reducerPath: "convoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/conversation",
    prepareHeaders: (headers) => {
      const userProfile = JSON.parse(localStorage.getItem("profile"));
      if (userProfile) {
        headers.set("Authorization", `Bearer ${userProfile.user.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createConvo: builder.mutation({
      query: (item) => {
        return {
          url: "/create-convo",
          method: "POST",
          body: item,
        };
      },
    }),
    getConvo: builder.query({
      query: (userId) => {
        return {
          url: `/${userId}`,
          method: "GET",
        };
      },
    }),
    getConvos: builder.query({
      query: (firstUserId, secondUserId) => {
        return {
          url: `/${firstUserId}/${secondUserId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateConvoMutation,
  useGetConvoQuery,
  useGetConvosQuery,
  useLazyGetConvosQuery,
} = convoApi;
