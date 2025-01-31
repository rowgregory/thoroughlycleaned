import { api } from "./api";

const BASE_URL = "/log";

export const logApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    deleteLog: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-log`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Log"],
    }),
    fetchLogs: build.query({
      query: () => `${BASE_URL}/fetch-logs`,
      providesTags: ["Log"],
    }),
    logSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Log"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useDeleteLogMutation,
  useFetchLogsQuery,
  useLogSystemStatusQuery,
} = logApi;
