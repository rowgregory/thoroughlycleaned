import { Reducer, createSlice } from "@reduxjs/toolkit";
import { profileApi } from "../services/profileApi";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  colorCode: string;
  role: string;
  isSoundEffectsOn: boolean;
  createdAt: any;
  updatedAt: string;
}

const ProfileState: Profile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  colorCode: "",
  role: "",
  isSoundEffectsOn: true,
  createdAt: "",
  updatedAt: "",
};

export interface ProfileStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  profile: Profile;
  openModalProfileUpdate: boolean;
  status: string;
}

export const initialProfileState: ProfileStatePayload = {
  loading: false,
  success: false,
  error: null,
  profile: ProfileState,
  openModalProfileUpdate: false,
  status: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setOpenModalProfileUpdate: (state) => {
      state.openModalProfileUpdate = true;
    },
    setCloseModalProfileUpdate: (state) => {
      state.openModalProfileUpdate = false;
    },
    setProfile: (state, { payload }: any) => {
      state.profile = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileApi.endpoints.fetchProfileFromId.matchPending,
        (state: any) => {
          state.loading = true;
        }
      )
      .addMatcher(
        profileApi.endpoints.fetchProfileFromId.matchFulfilled,
        (state: any, { payload }: any) => {
          state.profile = { ...state.profile, ...payload.profile };
          state.loading = false;
        }
      )
      .addMatcher(
        profileApi.endpoints.updateProfile.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        profileApi.endpoints.profileSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "profileApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const profileReducer =
  profileSlice.reducer as Reducer<ProfileStatePayload>;

export const {
  setOpenModalProfileUpdate,
  setCloseModalProfileUpdate,
  setProfile,
} = profileSlice.actions;
