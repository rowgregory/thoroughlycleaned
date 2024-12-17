"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { fetchTestimonial } from "./fetchTestimonial";

export async function GET(
  req: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>
) {
  const { id } = await params;
  const query = req.nextUrl.searchParams.get("endpoint");

  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  switch (query) {
    case "FETCH_TESTIMONIAL":
      return fetchTestimonial(numericId);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
