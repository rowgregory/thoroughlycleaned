"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { fetchTestimonials } from "./fetchTestimonials";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "FETCH_TESTIMONIALS":
      return fetchTestimonials();
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
