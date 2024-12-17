"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { URL } from "url";
import { fetchServices } from "./fetchServices";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  switch (query) {
    case "FETCH_SERVICES":
      return fetchServices();
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
