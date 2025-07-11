import { api } from "../store/api"; // shared base API with baseQuery
import { setCredentials } from "../store/authSlice";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

const extendedAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken, user } = data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(
            setCredentials({
              accessToken,
              refreshToken,
              user,
            })
          );
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    register: builder.mutation<AuthResponse, { name: string; email: string; password: string }>({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken, user } = data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(
            setCredentials({
              accessToken,
              refreshToken,
              user,
            })
          );
        } catch (err) {
          console.error("Register failed:", err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = extendedAuthApi;
