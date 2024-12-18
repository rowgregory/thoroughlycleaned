import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

export interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  isAuthenticated: boolean | null;
  token: string | null;
  isAdmin: boolean | null;
  phoneNumberVerified: boolean;
  codeVerified: boolean;
  user: {} | null;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  isAuthenticated: false,
  token: "",
  isAdmin: false,
  phoneNumberVerified: false,
  codeVerified: false,
  user: {},
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setPhoneNumberNotVerified(state) {
      state.phoneNumberVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: any) => {
          state.token = payload.token;
          state.isAdmin = payload.isAdmin;
        }
      )
      .addMatcher(
        authApi.endpoints.verifyPhoneNumber.matchFulfilled,
        (state) => {
          state.phoneNumberVerified = true;
        }
      )
      .addMatcher(authApi.endpoints.verifyCode.matchFulfilled, (state) => {
        state.codeVerified = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.success = true;
      })
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

export const { setAuthState, setPhoneNumberNotVerified } = authSlice.actions;
