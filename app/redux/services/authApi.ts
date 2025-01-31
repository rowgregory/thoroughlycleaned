import { api } from "./api";

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/register`,
        method: "POST",
        body,
      }),
    }),
    verifyCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/verify-code`,
        method: "PUT",
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
      }),
    }),
    login: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/verify-forgot-password-code`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/reset-password`,
        method: "PATCH",
        body,
      }),
    }),
    authSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Service"],
      keepUnusedDataFor: 0,
    }),
    resendCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/resend-code`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyCodeMutation,
  useLogoutMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useFetchForgotPasswordSystemStatusQuery,
  useVerifyForgotPasswordCodeMutation,
  useResetPasswordMutation,
  useAuthSystemStatusQuery,
  useResendCodeMutation,
} = authApi;
