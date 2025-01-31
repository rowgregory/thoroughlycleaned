import { api } from "./api";

const BASE_URL = "/approved-user";

export const approvedUserApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createApprovedUser: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-approved-user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Approved-User"],
    }),
    updateApprovedUser: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-approved-user`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Approved-User", "Profile", "User"],
    }),
    deleteApprovedUser: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-approved-user`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Approved-User"],
    }),
    fetchApprovedUsers: build.query({
      query: () => `${BASE_URL}/fetch-approved-users`,
      providesTags: ["Approved-User"],
    }),
    approvedUserSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Approved-User"],
    }),
  }),
});

export const {
  useCreateApprovedUserMutation,
  useUpdateApprovedUserMutation,
  useDeleteApprovedUserMutation,
  useFetchApprovedUsersQuery,
  useApprovedUserSystemStatusQuery,
} = approvedUserApi;
