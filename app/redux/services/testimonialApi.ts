import { setInitialArray } from "../features/dashboardSlice";
import { api } from "./api";

const BASE_URL = "/testimonial";

export const testimonialApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/post?endpoint=CREATE_TESTIMONIAL`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    updateTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/put?endpoint=UPDATE_TESTIMONIAL`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete?endpoint=DELETE_TESTIMONIAL`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    fetchTestimonials: build.query({
      query: () => `${BASE_URL}/get?endpoint=FETCH_TESTIMONIALS`,
      providesTags: ["Testimonial"],
      keepUnusedDataFor: 0,
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setInitialArray({ arrayToFilter: data.testimonials }));
        } catch (error) {
          console.error("Failed to fetch testimonials:", error);
        }
      },
    }),
    fetchTestimonial: build.query({
      query: (id: string) => `${BASE_URL}/get/${id}?endpoint=FETCH_TESTIMONIAL`,
      providesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useFetchTestimonialsQuery,
  useFetchTestimonialQuery,
} = testimonialApi;
