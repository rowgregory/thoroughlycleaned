"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { updateTestimonial } from "./updateTestimonial";

export async function PUT(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "UPDATE_TESTIMONIAL":
      return updateTestimonial(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
