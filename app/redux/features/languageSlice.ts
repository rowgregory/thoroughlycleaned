import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: {
    lng: "en",
    flag: "/images/us.webp",
    textKey: "United States",
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    selectLanguage: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { selectLanguage } = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
