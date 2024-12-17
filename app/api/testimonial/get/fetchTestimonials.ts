import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function fetchTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany();

    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
