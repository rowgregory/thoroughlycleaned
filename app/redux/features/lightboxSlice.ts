import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LightboxState {
  isLightboxOpen: boolean;
  currentImageIndex: number;
  images: any[];
}

const initialState: LightboxState = {
  isLightboxOpen: false,
  currentImageIndex: 0,
  images: [],
};

const lightboxSlice = createSlice({
  name: "lightbox",
  initialState,
  reducers: {
    openLightbox: (state, action: PayloadAction<any[]>) => {
      state.images = action.payload;
      state.currentImageIndex = 0;
      state.isLightboxOpen = true;
    },
    closeLightbox: (state) => {
      state.isLightboxOpen = false;
      state.images = [];
    },
    prevImage: (state) => {
      state.currentImageIndex =
        state.currentImageIndex === 0
          ? state.images.length - 1
          : state.currentImageIndex - 1;
    },
    nextImage: (state) => {
      state.currentImageIndex =
        state.currentImageIndex === state.images.length - 1
          ? 0
          : state.currentImageIndex + 1;
    },
  },
});

export const lightboxReducer = lightboxSlice.reducer;

export const { openLightbox, closeLightbox, prevImage, nextImage } =
  lightboxSlice.actions;
