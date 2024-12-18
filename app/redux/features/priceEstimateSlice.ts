import { Reducer, createSlice } from "@reduxjs/toolkit";
import { priceEstimateApi } from "../services/priceEstimateApi";
import { PriceEstimateProps } from "@/app/types/common.types";

const PriceEstimateState = {
  name: "",
  phoneNumber: "",
  serviceType: "",
  createdAt: "",
};

export interface PriceEstimateStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  priceEstimates: PriceEstimateProps[];
}

export const initialPriceEstimateState: PriceEstimateStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  priceEstimates: [PriceEstimateState],
};

export const priceEstimateSlice = createSlice({
  name: "priceEstimate",
  initialState: initialPriceEstimateState,
  reducers: {
    resetPriceEstimate: (state: any) => {
      state.priceEstimate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        priceEstimateApi.endpoints.createPriceEstimate.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        priceEstimateApi.endpoints.fetchPriceEstimates.matchFulfilled,
        (state: any, { payload }: any) => {
          state.priceEstimates = payload.priceEstimates;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "priceEstimateApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const priceEstimateReducer =
  priceEstimateSlice.reducer as Reducer<PriceEstimateStatePayload>;

export const { resetPriceEstimate } = priceEstimateSlice.actions;
