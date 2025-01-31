import { Reducer, createSlice } from "@reduxjs/toolkit";
import { logApi } from "../services/logApi";

export interface Log {
  id: string;
  level: string; // e.g., 'info', 'error', 'debug'
  message: string; // Description of the event or error
  metadata?: Record<string, any>; // Optional, store additional context
  userId: string;
  errorCode: number;
  createdAt: string; // DateTime as ISO string
}

export const LogState: Log = {
  id: "",
  level: "",
  message: "",
  metadata: undefined,
  userId: "",
  errorCode: 0,
  createdAt: new Date().toISOString(),
};
export interface LogStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  logs: Log[];
  log: Log;
  status: string;
}

export const initialLogState: LogStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  logs: [],
  log: LogState,
  status: "",
};

export const logSlice = createSlice({
  name: "log",
  initialState: initialLogState,
  reducers: {
    resetLog: (state: any) => {
      state.log = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(logApi.endpoints.deleteLog.matchFulfilled, (state: any) => {
        state.success = true;
      })
      .addMatcher(
        logApi.endpoints.fetchLogs.matchFulfilled,
        (state: any, { payload }: any) => {
          state.logs = payload.logs;
        }
      )
      .addMatcher(
        logApi.endpoints.logSystemStatus.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "logApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const logReducer = logSlice.reducer as Reducer<LogStatePayload>;

export const { resetLog } = logSlice.actions;
