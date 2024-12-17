"use client";

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

console.log(process.env.NEXT_PUBLIC_BASE_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
  // This ensures that cookies are included in
  // both the frontend and backend communication.
  credentials: "include",
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Auth", "Dashboard", "Service", "Testimonial"],
  endpoints: () => ({}),
}) as any;
