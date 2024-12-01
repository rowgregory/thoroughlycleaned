import { api } from "./api";

const BASE_URL = "/views/home/put";

interface UpdateHomePageProps {
  id: string;
  field: any;
  value: any;
}

export const homePageApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    updateHomePage: build.mutation({
      query: ({ id, field, value }: UpdateHomePageProps) => ({
        url: `${BASE_URL}?endpoint=UPDATE_HOME_PAGE`,
        method: "PUT",
        body: { id, field, value },
      }),
      invalidatesTags: ["Home-Page"],
    }),
  }),
});

export const { useUpdateHomePage } = homePageApi;
