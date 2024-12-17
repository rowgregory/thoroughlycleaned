import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function deleteTestimonial(id: number) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        { status: 5404 }
      );
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial",
      },
      { status: 500 }
    );
  }
}
