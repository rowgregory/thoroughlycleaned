import { Reducer, createSlice } from "@reduxjs/toolkit";
import { homePageApi } from "../services/homePageApi";

export interface HomePageStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  bannerSubtitle: string;
  bannerTitle: string;
}

export const initialHomePageState: HomePageStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  bannerSubtitle: "",
  bannerTitle: "",
};

export const homePageSlice = createSlice({
  name: "homePage",
  initialState: initialHomePageState,
  reducers: {
    resetHomePageSuccess: (state) => {
      state.success = false;
    },
    resetHomePageError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        homePageApi.endpoints.updateHomePage.matchFulfilled,
        (state: any, { payload }: any) => {
          state.info = payload.info;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "homePageApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const homePageReducer =
  homePageSlice.reducer as Reducer<HomePageStatePayload>;

export const { resetHomePageSuccess, resetHomePageError } =
  homePageSlice.actions;
