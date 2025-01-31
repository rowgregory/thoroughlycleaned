import { api } from "./api";

const BASE_URL = "/service";

export const serviceApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-service`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-service`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    fetchServicesByType: build.query({
      query: (type: string) => `${BASE_URL}/fetch-services-by-type/${type}`,
      providesTags: ["Service"],
    }),
    fetchServices: build.query({
      query: () => `${BASE_URL}/fetch-services`,
      providesTags: ["Service"],
    }),
    updateService: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-service`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    serviceSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Service"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useFetchServicesByTypeQuery,
  useFetchServicesQuery,
  useUpdateServiceMutation,
  useServiceSystemStatusQuery,
} = serviceApi;
