import { api } from "./api";

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/post?endpoint=REGISTER`,
        method: "POST",
        body,
      }),
    }),
    verifyPhoneNumber: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/post?endpoint=VERIFY_PHONE_NUMBER`,
        method: "POST",
        body,
      }),
    }),
    verifyCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/put?endpoint=VERIFY_CODE`,
        method: "PUT",
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${BASE_URL}/post?endpoint=LOGOUT`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyPhoneNumberMutation,
  useVerifyCodeMutation,
  useLogoutMutation,
} = authApi;
