import { Reducer, createSlice } from "@reduxjs/toolkit";
import { testimonialApi } from "../services/testimonialApi";

interface Testimonial {
  id: string;
  name: string;
  review: string;
  reviewTitle: string;
}
export const TestimonialState = {
  id: "",
  name: "",
  review: "",
  reviewTitle: "",
};

export interface TestimonialStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  testimonials: Testimonial[];
  testimonial: Testimonial;
  status: string;
  openModalTestimonialCreate: boolean;
  openModalTestimonialUpdate: boolean;
}

export const initialTestimonialState: TestimonialStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  testimonials: [],
  testimonial: TestimonialState,
  status: "",
  openModalTestimonialCreate: false,
  openModalTestimonialUpdate: false,
};

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: initialTestimonialState,
  reducers: {
    resetTestimonial: (state: any) => {
      state.testimonial = null;
    },
    setOpenModalTestimonialCreate: (state) => {
      state.openModalTestimonialCreate = true;
    },
    setCloseModalTestimonialCreate: (state) => {
      state.openModalTestimonialCreate = false;
    },
    setOpenModalTestimonialUpdate: (state, { payload }: any) => {
      state.openModalTestimonialUpdate = true;
      state.testimonial = payload;
    },
    setCloseModalTestimonialUpdate: (state) => {
      state.openModalTestimonialUpdate = false;
    },
    setTestimonials: (state, { payload }: any) => {
      state.testimonials = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        testimonialApi.endpoints.createTestimonial.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        testimonialApi.endpoints.updateTestimonial.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        testimonialApi.endpoints.deleteTestimonial.matchFulfilled,
        (state: any) => {
          state.success = true;
        }
      )
      .addMatcher(
        testimonialApi.endpoints.fetchTestimonials.matchFulfilled,
        (state: any, { payload }: any) => {
          state.testimonials = payload.testimonials;
        }
      )
      .addMatcher(
        testimonialApi.endpoints.testimonialSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "testimonialApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const testimonialReducer =
  testimonialSlice.reducer as Reducer<TestimonialStatePayload>;

export const {
  resetTestimonial,
  setOpenModalTestimonialCreate,
  setCloseModalTestimonialCreate,
  setOpenModalTestimonialUpdate,
  setCloseModalTestimonialUpdate,
  setTestimonials,
} = testimonialSlice.actions;
