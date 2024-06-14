import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createMotionComponent } from "framer-motion";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/message",
    prepareHeaders: (headers) => {
      const userProfile = JSON.parse(localStorage.getItem("profile"));
      if (userProfile) {
        headers.set("Authorization", `Bearer ${userProfile.user.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (item) => {
        return {
          url: "/create-message",
          method: "POST",
          body: item,
        };
      },
    }),
    getMessage: builder.query({
      query: (conversationId) => {
        return {
          url: `/${conversationId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateMessageMutation, useGetMessageQuery } = messageApi;
