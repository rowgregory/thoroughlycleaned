import { Reducer, createSlice } from "@reduxjs/toolkit";
import { clientLeadApi } from "../services/clientLeadApi";

interface ClientLeadProps {
  name: string;
  phoneNumber: string;
  serviceType: string;
  createdAt: string;
  id: string;
}
const ClientLeadState = {
  name: "",
  phoneNumber: "",
  serviceType: "",
  createdAt: "",
  id: "",
};

export interface ClientLeadStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  clientLeads: ClientLeadProps[];
  status: string;
}

export const initialClientLeadState: ClientLeadStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  clientLeads: [ClientLeadState],
  status: "",
};

export const clientLeadSlice = createSlice({
  name: "clientLead",
  initialState: initialClientLeadState,
  reducers: {
    resetClientLead: (state: any) => {
      state.clientLead = null;
    },
    setClientLeads: (state, { payload }) => {
      state.clientLeads = payload.clientLeads;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        clientLeadApi.endpoints.createClientLead.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        clientLeadApi.endpoints.fetchClientLeads.matchFulfilled,
        (state: any, { payload }: any) => {
          state.clientLeads = payload.clientLeads;
        }
      )
      .addMatcher(
        clientLeadApi.endpoints.updateClientLead.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        clientLeadApi.endpoints.clientLeadSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "clientLeadApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const clientLeadReducer =
  clientLeadSlice.reducer as Reducer<ClientLeadStatePayload>;

export const { resetClientLead, setClientLeads } = clientLeadSlice.actions;
