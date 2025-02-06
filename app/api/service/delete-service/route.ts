import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@/prisma/client";
import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import { ServiceErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function DELETE(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    let { id, fileName, mimeType } = await req.json();

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      await createLog(
        "error",
        `Service not found with id ${id}`,
        user.id,
        ServiceErrorCodes.MISSING_SERVICE,
        {
          errorMessage: `Service not found with id ${id}`,
          errorName: "UnknownError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
      return NextResponse.json(
        {
          success: true,
          message: "Service not found",
        },
        { status: 404 }
      );
    }

    await deleteFileFromFirebase(fileName, mimeType);

    await prisma.service.delete({
      where: { id },
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
      `Failed to delete service: ${error.message}`,
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
        message: "Failed to delete service. Please try again.",
      },
      { status: 500 }
    );
  }
}
