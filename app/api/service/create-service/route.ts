import { ServiceErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    const { name, url, description, serviceType, fileName } = await req.json();

    if (!name || !url || !description || !serviceType || !fileName) {
      return NextResponse.json(
        {
          message: `Missing required fields name:${name}, url:${url}, description:${description}, serviceType:${serviceType}`,
        },
        { status: 400 }
      );
    }

    await prisma.service.create({
      data: {
        name,
        url,
        fileName,
        serviceType,
        description,
        createdAt: new Date(),
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
      `Failed to create service: ${error.message}`,
      user.id,
      ServiceErrorCodes.GENERIC_SERVER_ERROR,
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
        message: "Failed to create service",
      },
      { status: 500 }
    );
  }
}
