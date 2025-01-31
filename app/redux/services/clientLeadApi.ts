import { setClientLeads } from "../features/clientLeadSlice";
import { api } from "./api";

const BASE_URL = "/client-lead";

export const clientLeadApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createClientLead: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-client-lead`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Client-Lead"],
    }),
    fetchClientLeads: build.query({
      query: () => `${BASE_URL}/fetch-client-leads`,
      providesTags: ["Client-Lead"],
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        const { data } = await queryFulfilled;

        dispatch(setClientLeads({ clientLeads: data.clientLeads }));
      },
    }),
    updateClientLead: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-client-lead`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Client-Lead"],
    }),
    clientLeadSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Client-Lead"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useCreateClientLeadMutation,
  useFetchClientLeadsQuery,
  useUpdateClientLeadMutation,
  useClientLeadSystemStatusQuery,
} = clientLeadApi;
