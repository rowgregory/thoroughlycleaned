import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { photoGalleryImageApi } from "../services/photoGalleryImageApi";
import { ProjectProps } from "@/app/types/photo-gallery.types";

export interface PhotoGalleryImage {
  id: number | null;
  url: string;
  createdAt: any;
  updateddAt: any;
}
export const PhotoGalleryImageState = {
  id: null,
  url: "",
  createdAt: "",
  updateddAt: "",
};

export interface PhotoGalleryStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  photoGalleryImages: PhotoGalleryImage[];
  projects: [];
  project: {} | any;
  openModalGalleryCreateDetails: boolean;
  openModalGalleryUpdateDetails: boolean;
  openModalGalleryPhotos: boolean;
}

export const initialPhotoGalleryState: PhotoGalleryStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  photoGalleryImages: [],
  projects: [],
  project: {},
  openModalGalleryCreateDetails: false,
  openModalGalleryUpdateDetails: false,
  openModalGalleryPhotos: false,
};

export const photoGallerySlice = createSlice({
  name: "photoGallery",
  initialState: initialPhotoGalleryState,
  reducers: {
    openGalleryDetailsCreateModal: (state: any) => {
      state.openModalGalleryCreateDetails = true;
    },
    closeGalleryDetailsCreateModal: (state: any) => {
      state.openModalGalleryCreateDetails = false;
    },
    openGalleryDetailsUpdateModal: (state: any) => {
      state.openModalGalleryUpdateDetails = true;
    },
    closeGalleryDetailsUpdateModal: (
      state: any,
      action: PayloadAction<ProjectProps | undefined>
    ) => {
      state.openModalGalleryUpdateDetails = false;
      state.project = action.payload || undefined;
    },
    openGalleryPhotosModal: (
      state: any,
      action: PayloadAction<ProjectProps | undefined>
    ) => {
      state.openModalGalleryPhotos = true;
      state.project = action.payload || undefined;
    },
    closeGalleryPhotosModal: (state: any) => {
      state.openModalGalleryPhotos = false;
    },
    resetGallery: (state: any) => {
      state.openModalGalleryCreateDetails = false;
      state.openModalGalleryUpdateDetails = false;
      state.openModalGalleryPhotos = false;
      state.project = undefined;
    },
    resetActiveProject: (state: any) => {
      state.project = undefined;
      state.openModalGalleryCreateDetails = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        photoGalleryImageApi.endpoints.fetchPhotoGalleryImages.matchFulfilled,
        (state: any, { payload }: any) => {
          const filteredImages = payload.photoGalleryImages.filter(
            (image: any) => image.imageRole === "after"
          );

          state.photoGalleryImages = filteredImages;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.createPhotoGalleryProject.matchFulfilled,
        (state: any, { payload }: any) => {
          state.project = payload.project;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.fetchPhotoGalleryProjects.matchFulfilled,
        (state: any, { payload }: any) => {
          state.projects = payload.projects;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.updatePhotoGalleryProject.matchFulfilled,
        (state: any) => {
          state.success = true;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.createAndAttachPhotoGalleryImage
          .matchFulfilled,
        (state: any, { payload }: any) => {
          state.project = payload.project;
          state.success = true;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.deletePhotoGalleryProjectPair
          .matchFulfilled,
        (state: any, { payload }: any) => {
          state.project = payload.project;
          state.success = true;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.deletePhotoGalleryProject.matchFulfilled,
        (state: any) => {
          state.success = true;
          state.loading = false;
        }
      )
      .addMatcher(
        photoGalleryImageApi.endpoints.photoGallerySystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "photoGalleryImageApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const photoGalleryReducer =
  photoGallerySlice.reducer as Reducer<PhotoGalleryStatePayload>;

export const {
  openGalleryDetailsCreateModal,
  closeGalleryDetailsCreateModal,
  openGalleryDetailsUpdateModal,
  closeGalleryDetailsUpdateModal,
  openGalleryPhotosModal,
  closeGalleryPhotosModal,
  resetGallery,
  resetActiveProject,
} = photoGallerySlice.actions;
