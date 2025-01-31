import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mockTestimonial = {
    name: "John Doe",
    review: "Great service, would definitely recommend!",
    reviewTitle: "Excellent Experience",
    serviceType: "Residential",
  };

  try {
    // Create a new Testimonial
    const createdTestimonial = await prisma.testimonial.create({
      data: mockTestimonial,
    });

    // Read the created Testimonial
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: createdTestimonial.id },
    });

    // Update the Testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: testimonial?.id },
      data: { reviewTitle: "Updated Experience" }, // Sample update
    });

    // Delete the Testimonial
    await prisma.testimonial.delete({
      where: { id: updatedTestimonial.id },
    });

    const status = getEndpointStatus(true, "Testimonial service");
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    const status = getEndpointStatus(
      false,
      extractSentenceWithArgument(err.message)
    );
    return NextResponse.json(status, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
