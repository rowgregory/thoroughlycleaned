import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function createTestimonial(req: NextRequest) {
  try {
    const { name, review, reviewTitle } = await req.json();

    if (!name || !review || !reviewTitle) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.testimonial.create({
      data: {
        name,
        review,
        reviewTitle,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
