import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function fetchTestimonial(id: number) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id,
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ testimonial }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
