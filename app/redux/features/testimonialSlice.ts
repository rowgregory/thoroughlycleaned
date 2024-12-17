import { Reducer, createSlice } from "@reduxjs/toolkit";
import { testimonialApi } from "../services/testimonialApi";

interface Testimonial {
  id: number | null;
  name: string;
  review: string;
  reviewTitle: string;
}
const TestimonialState = {
  id: null,
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
}

export const initialTestimonialState: TestimonialStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  testimonials: [],
  testimonial: TestimonialState,
};

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: initialTestimonialState,
  reducers: {
    resetTestimonial: (state: any) => {
      state.testimonial = null;
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
        testimonialApi.endpoints.fetchTestimonial.matchFulfilled,
        (state: any, { payload }: any) => {
          state.testimonial = payload.testimonial;
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

export const { resetTestimonial } = testimonialSlice.actions;
