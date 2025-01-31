import { api } from "./api";

const BASE_URL = "/testimonial";

export const testimonialApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-testimonial`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    updateTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-testimonial`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-testimonial`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    fetchTestimonials: build.query({
      query: () => `${BASE_URL}/fetch-testimonials`,
      providesTags: ["Testimonial"],
    }),
    testimonialSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Testimonial"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useFetchTestimonialsQuery,
  useTestimonialSystemStatusQuery,
} = testimonialApi;
