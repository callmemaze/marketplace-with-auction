import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/auth/user" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => {
        // console.log("Create User Data", user);

        return {
          url: "/signup",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        localStorage.setItem("profile", JSON.stringify({ user }));
        return {
          url: `/signin`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: `/logout`,
          method: "POST",
          body: {},
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
