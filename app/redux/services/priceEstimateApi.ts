import { setInitialArray } from "../features/dashboardSlice";
import { api } from "./api";

const BASE_URL = "/price-estimate";

export const priceEstimateApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createPriceEstimate: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/post?endpoint=CREATE_PRICE_ESTIMATE`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Price-Estimate"],
    }),
    fetchPriceEstimates: build.query({
      query: () => `${BASE_URL}/get?endpoint=FETCH_PRICE_ESTIMATES`,
      providesTags: ["Price-Estimate"],
      keepUnusedDataFor: 0,
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setInitialArray({ arrayToFilter: data.priceEstimates }));
        } catch (error) {
          console.error("Failed to fetch priceEstimates:", error);
        }
      },
    }),
  }),
});

export const { useCreatePriceEstimateMutation, useFetchPriceEstimatesQuery } =
  priceEstimateApi;
