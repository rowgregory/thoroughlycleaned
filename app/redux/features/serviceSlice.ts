import { Reducer, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../services/serviceApi";

interface Service {
  id: number | null;
  image: string;
  file: any;
  name: string;
  description: string;
  createdAt: any;
}
const ServiceState = {
  id: null,
  image: "",
  file: "",
  name: "",
  description: "",
  createdAt: "",
};

export interface ServiceStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  services: Service[];
  service: Service;
}

export const initialServiceState: ServiceStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  services: [],
  service: ServiceState,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: initialServiceState,
  reducers: {
    resetService: (state: any) => {
      state.service = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        serviceApi.endpoints.createService.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        serviceApi.endpoints.updateService.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        serviceApi.endpoints.deleteService.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        serviceApi.endpoints.fetchServices.matchFulfilled,
        (state: any, { payload }: any) => {
          state.services = payload.services;
        }
      )
      .addMatcher(
        serviceApi.endpoints.fetchService.matchFulfilled,
        (state: any, { payload }: any) => {
          state.service = payload.service;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "serviceApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const serviceReducer =
  serviceSlice.reducer as Reducer<ServiceStatePayload>;

export const { resetService } = serviceSlice.actions;
