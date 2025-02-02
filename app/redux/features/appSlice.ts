import { Reducer, createSlice } from "@reduxjs/toolkit";

interface ModalUploaderPayload {
  show: boolean;
  src: any;
  type: string;
  textBlockKey: string;
  initialValue?: string;
}

export interface AppStatePayload {
  isMediaReady: boolean;
  openModalClientLeadPublic: boolean;
  openModalMediaUploaderPublic: boolean;
  openModalImageUploaderPublic: boolean;
  openModalEditableTextAreaPublic: boolean;
  openModalEditableVideoPublic: boolean;
  mediaData: ModalUploaderPayload;
  openNavigationDrawer: boolean;
  openModalClientLeadCreated: boolean;
  openDrawerAdminNav: boolean;
}

const mediaDataInitialState = {
  show: false,
  src: "",
  type: "",
  textBlockKey: "",
  initialValue: "",
};

export const initialAppState: AppStatePayload = {
  isMediaReady: false,
  openModalClientLeadPublic: false,
  openModalMediaUploaderPublic: false,
  openModalImageUploaderPublic: false,
  openModalEditableVideoPublic: false,
  openModalEditableTextAreaPublic: false,
  mediaData: mediaDataInitialState,
  openNavigationDrawer: false,
  openModalClientLeadCreated: false,
  openDrawerAdminNav: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsMediaReady: (state) => {
      state.isMediaReady = true;
    },
    setOpenModalClientLeadPublic: (state) => {
      state.openModalClientLeadPublic = true;
    },
    setCloseModalClientLeadPublic: (state) => {
      state.openModalClientLeadPublic = false;
    },
    setOpenModalClientLeadCreated: (state) => {
      state.openModalClientLeadCreated = true;
    },
    setCloseModalClientLeadCreated: (state) => {
      state.openModalClientLeadCreated = false;
    },
    setOpenModalMediaUploaderPublic: (state) => {
      state.openModalMediaUploaderPublic = true;
    },
    setCloseModalMediaUploaderPublic: (state) => {
      state.openModalMediaUploaderPublic = false;
    },
    setOpenModalImageUploaderPublic: (state, { payload }) => {
      state.mediaData = payload.mediaData;
      state.openModalImageUploaderPublic = true;
    },
    setCloseModalImageUploaderPublic: (state) => {
      state.mediaData = mediaDataInitialState;
      state.openModalImageUploaderPublic = false;
    },
    setOpenModalEditableTextAreaPublic: (state, { payload }) => {
      state.mediaData = payload.mediaData;
      state.openModalEditableTextAreaPublic = true;
    },
    setCloseModalEditableTextAreaPublic: (state) => {
      state.mediaData = mediaDataInitialState;
      state.openModalEditableTextAreaPublic = false;
    },
    setOpenModalEditableVideoPublic: (state, { payload }) => {
      state.mediaData = payload.mediaData;
      state.openModalEditableVideoPublic = true;
    },
    setCloseModalEditableVideoPublic: (state) => {
      state.mediaData = mediaDataInitialState;
      state.openModalEditableVideoPublic = false;
    },
    setOpenNavigationDrawer: (state) => {
      state.openNavigationDrawer = true;
    },
    setCloseNavigationDrawer: (state) => {
      state.openNavigationDrawer = false;
    },
    setOpenDrawerAdminNav: (state) => {
      state.openDrawerAdminNav = true;
    },
    setCloseDrawerAdminNav: (state) => {
      state.openDrawerAdminNav = false;
    },
  },
  extraReducers: () => {},
});

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>;

export const {
  setIsMediaReady,
  setOpenModalClientLeadPublic,
  setCloseModalClientLeadPublic,
  setOpenModalMediaUploaderPublic,
  setCloseModalMediaUploaderPublic,
  setOpenModalImageUploaderPublic,
  setCloseModalImageUploaderPublic,
  setOpenModalEditableTextAreaPublic,
  setCloseModalEditableTextAreaPublic,
  setOpenModalEditableVideoPublic,
  setCloseModalEditableVideoPublic,
  setOpenNavigationDrawer,
  setCloseNavigationDrawer,
  setCloseModalClientLeadCreated,
  setOpenModalClientLeadCreated,
  setOpenDrawerAdminNav,
  setCloseDrawerAdminNav,
} = appSlice.actions;
