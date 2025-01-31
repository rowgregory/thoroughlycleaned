import { NextResponse } from "next/server.js";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { TestimonialErrorCodes } from "@/app/utils/errorCodes";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany();

    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch testimonials: ${error.message}`,
      "unknown",
      TestimonialErrorCodes.GENERIC_SERVER_ERROR,
      {
        errorStack: error.stack,
        errorMessage: error.message,
      }
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
        errorCode: TestimonialErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
