import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { teamMemberApi } from "../services/teamMemberApi";

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  yearsWorked: string;
  url: string;
  fileName: string;
}

interface TeamMemberDetails {
  firstName: string;
  lastName: string;
  position: string;
  yearsWorked: string;
  url: string;
}

const teamMemberDetailsState: TeamMemberDetails = {
  firstName: "",
  lastName: "",
  position: "",
  yearsWorked: "",
  url: "",
};

export const teamMemberState: TeamMember = {
  id: "",
  firstName: "",
  lastName: "",
  position: "",
  yearsWorked: "",
  url: "",
  fileName: "",
};

export interface TeamMemberStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  teamMembers: TeamMember[];
  teamMember: TeamMember;
  modalOpenTeamMemberUpdate: boolean;
  modalOpenTeamMemberCreate: boolean;
  openModalTeamMemberDetails: boolean;
  status: string;
  teamMemberDetails: TeamMemberDetails;
}

export const initialTeamMemberState: TeamMemberStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  teamMembers: [],
  teamMember: teamMemberState,
  modalOpenTeamMemberUpdate: false,
  modalOpenTeamMemberCreate: false,
  openModalTeamMemberDetails: false,
  status: "",
  teamMemberDetails: teamMemberDetailsState,
};

export const teamMemberSlice = createSlice({
  name: "teamMember",
  initialState: initialTeamMemberState,
  reducers: {
    resetTeamMember: (state: any) => {
      state.teamMember = null;
    },
    setTeamMembers: (state: any, { payload }: any) => {
      state.teamMembers = payload;
    },
    setActiveTeamMember: (
      state: any,
      { payload }: { payload: TeamMember | {} }
    ) => {
      state.teamMember = payload;
    },
    setModalOpenTeamMemberUpdate: (state: any, { payload }: any) => {
      state.teamMember = payload;
      state.modalOpenTeamMemberUpdate = true;
    },
    setModalCloseTeamMemberUpdate: (state: any) => {
      state.teamMember = {};
      state.modalOpenTeamMemberUpdate = false;
    },
    setModalOpenTeamMemberCreate: (state: any) => {
      state.modalOpenTeamMemberCreate = true;
    },
    setModalCloseTeamMemberCreate: (state: any) => {
      state.modalOpenTeamMemberCreate = false;
    },
    setOpenModalTeamMemberDetails: (
      state: any,
      { payload }: PayloadAction<{ teamMemberDetails: TeamMemberDetails }>
    ) => {
      state.openModalTeamMemberDetails = true;
      state.teamMemberDetails = payload.teamMemberDetails;
    },
    setCloseModalTeamMemberDetails: (state: any) => {
      state.openModalTeamMemberDetails = false;
      state.teamMemberDetails = teamMemberDetailsState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        teamMemberApi.endpoints.createTeamMember.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        teamMemberApi.endpoints.updateTeamMember.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        teamMemberApi.endpoints.deleteTeamMember.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        teamMemberApi.endpoints.fetchTeamMembers.matchFulfilled,
        (state: any, { payload }: any) => {
          state.teamMembers = payload.teamMembers;
        }
      )
      .addMatcher(
        teamMemberApi.endpoints.systemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "teamMemberApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const teamMemberReducer =
  teamMemberSlice.reducer as Reducer<TeamMemberStatePayload>;

export const {
  resetTeamMember,
  setActiveTeamMember,
  setModalOpenTeamMemberUpdate,
  setModalCloseTeamMemberUpdate,
  setModalOpenTeamMemberCreate,
  setModalCloseTeamMemberCreate,
  setOpenModalTeamMemberDetails,
  setCloseModalTeamMemberDetails,
  setTeamMembers,
} = teamMemberSlice.actions;
