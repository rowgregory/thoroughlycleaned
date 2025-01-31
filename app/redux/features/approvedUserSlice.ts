import { Reducer, createSlice } from "@reduxjs/toolkit";
import { approvedUserApi } from "../services/approvedUserApi";

interface ApprovedUser {
  id: string;
  name: string;
  phoneNumber: string;
  colorCode: string;
}
const ApprovedUserState = {
  id: "",
  name: "",
  phoneNumber: "",
  colorCode: "",
};

export interface ApprovedUserStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  approvedUsers: ApprovedUser[];
  approvedUser: ApprovedUser;
  openModalCreateApprovedUser: boolean;
  openModalUpdateApprovedUser: boolean;
  status: string;
  recordCount: any;
}

export const initialApprovedUserState: ApprovedUserStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  approvedUsers: [],
  approvedUser: ApprovedUserState,
  openModalCreateApprovedUser: false,
  openModalUpdateApprovedUser: false,
  status: "",
  recordCount: null,
};

export const approvedUserSlice = createSlice({
  name: "approvedUser",
  initialState: initialApprovedUserState,
  reducers: {
    openCreateApprovedUserModal: (state: any) => {
      state.openModalCreateApprovedUser = true;
    },
    closeCreateApprovedUserModal: (state: any) => {
      state.openModalCreateApprovedUser = false;
    },
    openUpdateApprovedUserModal: (state: any, { payload }: any) => {
      state.openModalUpdateApprovedUser = true;
      state.approvedUser = payload;
    },
    closeUpdateApprovedUserModal: (state: any) => {
      state.openModalUpdateApprovedUser = false;
    },
    resetApprovedUser: (state: any) => {
      state.openModalUpdateApprovedUser = false;
      state.openModalCreateApprovedUser = false;
      state.approvedUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        approvedUserApi.endpoints.createApprovedUser.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        approvedUserApi.endpoints.updateApprovedUser.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        approvedUserApi.endpoints.deleteApprovedUser.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        approvedUserApi.endpoints.fetchApprovedUsers.matchFulfilled,
        (state: any, { payload }: any) => {
          state.approvedUsers = payload.approvedUsers;
        }
      )
      .addMatcher(
        approvedUserApi.endpoints.approvedUserSystemStatus.matchPending,
        (state: any) => {
          state.loading = true;
        }
      )
      .addMatcher(
        approvedUserApi.endpoints.approvedUserSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.status = payload.status;
          state.message = payload.message;
          state.recordCount = payload.recordCount;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "approvedUserApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const approvedUserReducer =
  approvedUserSlice.reducer as Reducer<ApprovedUserStatePayload>;

export const {
  openCreateApprovedUserModal,
  closeCreateApprovedUserModal,
  openUpdateApprovedUserModal,
  closeUpdateApprovedUserModal,
  resetApprovedUser,
} = approvedUserSlice.actions;
