import { TestimonialErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      await createLog(
        "error",
        `Testimonial not found.`,
        "unknown",
        TestimonialErrorCodes.MISSING_SERVICE,
        {
          errorMessage: `Testimonial not found.`,
          errorName: "UnknownError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
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
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to delete testimonial: ${error.message}`,
      "Unknown",
      TestimonialErrorCodes.GENERIC_SERVER_ERROR,
      {
        errorLocation: parseErrorStack(error),
        errorMessage: error.message,
        errorName: error.name || "UnknownError",
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
      }
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial",
      },
      { status: 500 }
    );
  }
}
