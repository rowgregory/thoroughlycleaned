import { api } from "./api";

const BASE_URL = "/profile";

export const profileApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchProfileFromId: build.query({
      query: (id: string) => `${BASE_URL}/get-profile-from-id/${id}`,
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile", "User", "Approved-User"],
    }),
    profileSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Profile"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useFetchProfileFromIdQuery,
  useUpdateProfileMutation,
  useProfileSystemStatusQuery,
} = profileApi;
