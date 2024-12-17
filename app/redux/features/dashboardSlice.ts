import { Reducer, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../services/dashboardApi";

export interface DashboardStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  filteredArray: {}[];
  sortKey: string;
  sortDirection: string;
  sortedData: {}[];
}

export const initialDashboardState: DashboardStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  sortKey: "",
  sortDirection: "asc",
  sortedData: [],
  filteredArray: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    resetDashboardSuccess: (state) => {
      state.success = false;
    },
    resetDashboardError: (state) => {
      state.error = null;
      state.message = null;
    },
    sortTable: (state, action) => {
      const { key } = action.payload;

      const direction =
        state.sortKey === key && state.sortDirection === "asc" ? "desc" : "asc";

      state.sortKey = key;
      state.sortDirection = direction;

      const getValueFromObject = (obj: any, key: any) => {
        const keys = key.split(".");
        return keys.reduce((acc: any, curr: any) => acc?.[curr], obj);
      };

      const sortedData = [...state.filteredArray].sort((a, b) => {
        let valueA = a;
        let valueB = b;

        valueA = getValueFromObject(valueA, key);
        valueB = getValueFromObject(valueB, key);

        if (typeof valueA === "string" && typeof valueB === "string") {
          if (valueA.toLowerCase() < valueB.toLowerCase())
            return direction === "asc" ? -1 : 1;
          if (valueA.toLowerCase() > valueB.toLowerCase())
            return direction === "asc" ? 1 : -1;
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });

      state.filteredArray = sortedData;
    },
    setInitialArray: (state, { payload }) => {
      state.filteredArray = payload.arrayToFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dashboardApi.endpoints.getDashboardData.matchFulfilled,
        (state: any, { payload }: any) => {
          state.info = payload.info;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "dashboardApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const dashboardReducer =
  dashboardSlice.reducer as Reducer<DashboardStatePayload>;

export const {
  resetDashboardSuccess,
  resetDashboardError,
  sortTable,
  setInitialArray,
} = dashboardSlice.actions;
