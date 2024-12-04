import { Reducer, createSlice } from "@reduxjs/toolkit";

export interface AppStatePayload {
  isVideoLoaded: boolean;
}

export const initialAppState: AppStatePayload = {
  isVideoLoaded: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsVideoLoaded: (state) => {
      state.isVideoLoaded = false;
    },
  },
});

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>;

export const { setIsVideoLoaded } = appSlice.actions;
