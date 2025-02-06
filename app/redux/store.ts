"use client";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { api } from "./services/api";
import { authReducer } from "./features/authSlice";
import { appReducer } from "./features/appSlice";
import { serviceReducer } from "./features/serviceSlice";
import { testimonialReducer } from "./features/testimonialSlice";
import { clientLeadReducer } from "./features/clientLeadSlice";
import { photoGalleryReducer } from "./features/photoGallerySlice";
import { textBlockReducer } from "./features/textBlockSlice";
import storage from "../utils/createNoopStorage";
import { approvedUserReducer } from "./features/approvedUserSlice";
import { lightboxReducer } from "./features/lightboxSlice";
import { profileReducer } from "./features/profileSlice";
import { userReducer } from "./features/userSlice";
import { logReducer } from "./features/logSlice";
import { teamMemberReducer } from "./features/teamMemberSlice";

// Custom transform to remove `someAttribute` from service state before persisting
const serviceTransform = createTransform(
  (inboundState: any) => {
    const { openModalServiceDetails, ...rest } = inboundState; // Remove `someAttribute`
    return rest;
  },
  (outboundState) => outboundState, // No changes needed on rehydration
  { whitelist: ["service"] } // Apply only to "service"
);

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  service: serviceReducer,
  testimonial: testimonialReducer,
  clientLead: clientLeadReducer,
  photoGallery: photoGalleryReducer,
  textBlock: textBlockReducer,
  approvedUser: approvedUserReducer,
  lightbox: lightboxReducer,
  profile: profileReducer,
  user: userReducer,
  log: logReducer,
  teamMember: teamMemberReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig: any = {
  key: "root",
  storage,
  whitelist: ["service", "profile"],
  transforms: [serviceTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
