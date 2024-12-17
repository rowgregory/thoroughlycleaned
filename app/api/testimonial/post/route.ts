"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { createTestimonial } from "./createTestimonial";

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "CREATE_TESTIMONIAL":
      return createTestimonial(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
