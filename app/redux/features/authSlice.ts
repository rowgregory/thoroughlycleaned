import { Reducer, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

export interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  isAuthenticated: boolean | null;
  userId?: string;
  phoneNumberVerified: boolean;
  revealVerifyCodeForm: boolean;
  forgotPasswordCredentialsValid: boolean;
  toggleForgotPasswordForm: boolean;
  toggleVerifyCodeForm: boolean;
  toggleResetPasswordForm: boolean;
  phoneNumber: string;
  role: string;
  status: string;
  checks: any;
  expiresAt: any;
  twoFactorAuthId: any;
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  isAuthenticated: false,
  userId: "",
  phoneNumberVerified: false,
  revealVerifyCodeForm: false,
  forgotPasswordCredentialsValid: false,
  toggleForgotPasswordForm: true,
  toggleVerifyCodeForm: false,
  toggleResetPasswordForm: false,
  phoneNumber: "",
  role: "",
  status: "",
  checks: null,
  expiresAt: "",
  twoFactorAuthId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState(state, { payload }) {
      state.isAuthenticated = payload.isAuthenticated;
      state.userId = payload.userId;
      state.role = payload.role;
    },
    setPhoneNumberNotVerified(state) {
      state.phoneNumberVerified = false;
    },
    setPhoneNumberVerified(state) {
      state.phoneNumberVerified = true;
    },
    setRevealVerifyCodeForm(state) {
      state.revealVerifyCodeForm = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: any) => {
          state.phoneNumberVerified = payload.phoneNumberVerified;
          state.revealVerifyCodeForm = payload.revealVerifyCodeForm;
          state.expiresAt = payload.expiresAt;
          state.twoFactorAuthId = payload.twoFactorAuthId;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }: any) => {
          state.isAuthenticated = payload.isAuthenticated;
        }
      )
      .addMatcher(authApi.endpoints.verifyCode.matchFulfilled, (state) => {
        state.success = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.success = true;
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchFulfilled, (state) => {
        state.toggleForgotPasswordForm = false;
        state.toggleVerifyCodeForm = true;
        state.toggleResetPasswordForm = false;
      })
      .addMatcher(
        authApi.endpoints.authSystemStatus.matchFulfilled,
        (state, { payload }: any) => {
          state.status = payload.status;
          state.message = payload.message;
          state.checks = payload.checks;
        }
      )
      .addMatcher(
        authApi.endpoints.verifyForgotPasswordCode.matchFulfilled,
        (state, { payload }: any) => {
          state.toggleForgotPasswordForm = false;
          state.toggleVerifyCodeForm = false;
          state.toggleResetPasswordForm = true;
          state.phoneNumber = payload.phoneNumber;
        }
      )
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state) => {
        state.success = true;
      })
      .addMatcher(
        authApi.endpoints.resendCode.matchFulfilled,
        (state, { payload }: any) => {
          state.phoneNumberVerified = payload.phoneNumberVerified;
          state.revealVerifyCodeForm = payload.revealVerifyCodeForm;
          state.expiresAt = payload.expiresAt;
          state.twoFactorAuthId = payload.twoFactorAuthId;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "authApi",
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>;

export const {
  setAuthState,
  setPhoneNumberNotVerified,
  setPhoneNumberVerified,
  setRevealVerifyCodeForm,
} = authSlice.actions;
