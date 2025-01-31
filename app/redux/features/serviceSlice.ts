import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "../services/serviceApi";
import { ServiceType } from "@/app/types/service.types";

export interface Service {
  id: string;
  url: string;
  file: any;
  name: string;
  fileName: string;
  description: string;
  serviceType: ServiceType;
  createdAt: any;
}

interface ServiceDetails {
  url: string;
  name: string;
  description: string;
  serviceType: ServiceType;
}
const ServiceDetailsState: ServiceDetails = {
  url: "",
  name: "",
  description: "",
  serviceType: "Commercial" as ServiceType,
};

export const ServiceState: Service = {
  id: "",
  url: "",
  file: "",
  name: "",
  fileName: "",
  description: "",
  serviceType: "Residential",
  createdAt: "",
};

export interface ServiceStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  services: Service[];
  service: Service;
  modalOpenServiceUpdate: boolean;
  modalOpenServiceCreate: boolean;
  openModalServiceDetails: boolean;
  status: string;
  serviceDetails: ServiceDetails;
}

export const initialServiceState: ServiceStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  services: [],
  service: ServiceState,
  modalOpenServiceUpdate: false,
  modalOpenServiceCreate: false,
  openModalServiceDetails: false,
  status: "",
  serviceDetails: ServiceDetailsState,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: initialServiceState,
  reducers: {
    resetService: (state: any) => {
      state.service = null;
    },
    setServices: (state: any, { payload }: any) => {
      state.services = payload;
    },
    setActiveService: (state: any, { payload }: { payload: Service | {} }) => {
      state.service = payload;
    },
    setModalOpenServiceUpdate: (state: any, { payload }: any) => {
      state.service = payload;
      state.modalOpenServiceUpdate = true;
    },
    setModalCloseServiceUpdate: (state: any) => {
      state.service = {};
      state.modalOpenServiceUpdate = false;
    },
    setModalOpenServiceCreate: (state: any) => {
      state.modalOpenServiceCreate = true;
    },
    setModalCloseServiceCreate: (state: any) => {
      state.modalOpenServiceCreate = false;
    },
    setOpenModalServiceDetails: (
      state: any,
      { payload }: PayloadAction<{ serviceDetails: ServiceDetails }>
    ) => {
      state.openModalServiceDetails = true;
      state.serviceDetails = payload.serviceDetails;
    },
    setCloseModalServiceDetails: (state: any) => {
      state.openModalServiceDetails = false;
      state.serviceDetails = ServiceDetailsState;
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
        serviceApi.endpoints.fetchServicesByType.matchFulfilled,
        (state: any, { payload }: any) => {
          state.services = payload.services;
        }
      )
      .addMatcher(
        serviceApi.endpoints.serviceSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
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

export const {
  resetService,
  setActiveService,
  setModalOpenServiceUpdate,
  setModalCloseServiceUpdate,
  setModalOpenServiceCreate,
  setModalCloseServiceCreate,
  setOpenModalServiceDetails,
  setCloseModalServiceDetails,
  setServices,
} = serviceSlice.actions;
