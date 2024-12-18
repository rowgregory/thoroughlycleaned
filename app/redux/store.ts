"use client";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./services/api";
import { imgbbApi } from "./services/imgBBApi";
import { authReducer } from "./features/authSlice";
import { homePageReducer } from "./features/homePageSlice";
import { appReducer } from "./features/appSlice";
import { dashboardReducer } from "./features/dashboardSlice";
import { serviceReducer } from "./features/serviceSlice";
import { testimonialReducer } from "./features/testimonialSlice";
import { priceEstimateReducer } from "./features/priceEstimateSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  homePage: homePageReducer,
  app: appReducer,
  dashboard: dashboardReducer,
  service: serviceReducer,
  testimonial: testimonialReducer,
  priceEstimate: priceEstimateReducer,
  [api.reducerPath]: api.reducer,
  [imgbbApi.reducerPath]: imgbbApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(imgbbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
