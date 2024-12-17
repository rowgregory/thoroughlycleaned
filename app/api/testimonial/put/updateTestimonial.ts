import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function updateTestimonial(req: Request) {
  try {
    const { id, name, review, reviewTitle } = await req.json();

    if (!id || !name || !review || !reviewTitle) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        review,
        reviewTitle,
      },
    });

    return NextResponse.json({
      success: true,
      testimonial: updatedTestimonial,
    });
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
