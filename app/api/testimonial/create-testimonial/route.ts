import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { TestimonialErrorCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function POST(req: NextRequest) {
  try {
    let { name, review, reviewTitle, serviceType } = await req.json();

    const missingParams = ["name", "review", "reviewTitle"].filter(
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

    await prisma.testimonial.create({
      data: {
        name,
        review,
        reviewTitle,
        serviceType,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to create testmonial: ${error.message}`,
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
        message: "Failed to create testmonial",
        errorCode: TestimonialErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
