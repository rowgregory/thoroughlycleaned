import { TestimonialErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function PUT(req: NextRequest) {
  try {
    const { id, name, review, reviewTitle, serviceType } = await req.json();

    const missingParams = ["id", "name", "review", "reviewTitle"].filter(
      (param) => !eval(param)
    );

    if (missingParams.length) {
      await createLog(
        "error",
        `Missing required parameters: ${missingParams.join(", ")}`,
        "unknown",
        TestimonialErrorCodes.PARSE_REQUEST_BODY_ERROR,
        {
          errorMessage: `Missing required parameters: ${missingParams.join(
            ", "
          )}`,
          errorName: "UnknownError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        review,
        reviewTitle,
        serviceType,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update testmonial: ${error.message}`,
      "unknown",
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
        message: "Failed to update testmonial",
      },
      { status: 500 }
    );
  }
}
