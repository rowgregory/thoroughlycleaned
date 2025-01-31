import { api } from "./api";

const BASE_URL = "/text-block";

export const textBlockApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    updateTextBlock: build.mutation({
      query: (body: { key: string; value: string }) => ({
        url: `${BASE_URL}/update-text-block`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Text-Block"],
    }),
    fetchHeaderAndFooterTextBlocks: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/fetch-header-and-footer-text-blocks`,
        };
      },
      providesTags: ["Text-Block"],
    }),
    fetchHomePageData: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/fetch-home-page-data`,
        };
      },
      providesTags: ["Text-Block"],
    }),
    fetchPageSpecificTextBlocks: build.query({
      query: (pageTypes: any) => {
        const serializedPageTypes = pageTypes.join(",");
        return {
          url: `${BASE_URL}/fetch-page-specific-text-blocks/${serializedPageTypes}`,
        };
      },
      providesTags: ["Text-Block"],
    }),
    textBlockSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Text-Block"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useUpdateTextBlockMutation,
  useFetchHeaderAndFooterTextBlocksQuery,
  useTextBlockSystemStatusQuery,
  useFetchHomePageDataQuery,
  useFetchPageSpecificTextBlocksQuery,
} = textBlockApi;
