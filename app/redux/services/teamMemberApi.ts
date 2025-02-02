import { api } from "./api";

const BASE_URL = "/team-member";

export const teamMemberApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createTeamMember: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-team-member`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team-Member"],
    }),
    deleteTeamMember: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-team-member`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Team-Member"],
    }),
    fetchTeamMembers: build.query({
      query: () => `${BASE_URL}/fetch-team-members`,
      providesTags: ["Team-Member"],
    }),
    updateTeamMember: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-team-member`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Team-Member"],
    }),
    systemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Team-Member"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useFetchTeamMembersQuery,
  useUpdateTeamMemberMutation,
  useSystemStatusQuery,
} = teamMemberApi;
