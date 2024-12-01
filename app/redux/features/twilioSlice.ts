import { Reducer, createSlice } from "@reduxjs/toolkit";
import { twilioApi } from "../services/twilioApi";

export interface TwilioStatePayload {
  message: string;
  success: boolean;
}

export const initialTwilioState: TwilioStatePayload = {
  message: "",
  success: false,
};

export const twilioSlice = createSlice({
  name: "twilio",
  initialState: initialTwilioState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        twilioApi.endpoints.sendTwilioWhatsAppMessage.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = payload.sucess;
        }
      )
      .addMatcher(
        twilioApi.endpoints.sendTwilioSMSMessage.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = payload.sucess;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "twilioApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const twilioReducer = twilioSlice.reducer as Reducer<TwilioStatePayload>;

export const {} = twilioSlice.actions;
