import { setInitialArray } from "../features/dashboardSlice";
import { api } from "./api";

const BASE_URL = "/service";

export const serviceApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/post?endpoint=CREATE_SERVICE`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/put?endpoint=UPDATE_SERVICE`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete?endpoint=DELETE_SERVICE`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    fetchServices: build.query({
      query: () => `${BASE_URL}/get?endpoint=FETCH_SERVICES`,
      providesTags: ["Service"],
      keepUnusedDataFor: 0,
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setInitialArray({ arrayToFilter: data.services }));
        } catch (error) {
          console.error("Failed to fetch services:", error);
        }
      },
    }),
    fetchService: build.query({
      query: (id: string) => `${BASE_URL}/get/${id}?endpoint=FETCH_SERVICE`,
      providesTags: ["Service"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useFetchServicesQuery,
  useFetchServiceQuery,
} = serviceApi;
