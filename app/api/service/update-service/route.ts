"use server";

import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import { ServiceErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function PUT(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    const { id, name, url, description, serviceType, fileName } =
      await req.json();

    if (!id || !name || !url || !description || !serviceType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    if (existingService.fileName && existingService.fileName !== fileName) {
      try {
        await deleteFileFromFirebase(existingService.fileName, "image");
      } catch (error: any) {
        await createLog(
          "error",
          `Error deleting previous image: ${error.message}`,
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
      }
    }

    await prisma.service.update({
      where: { id },
      data: {
        name,
        url,
        description,
        serviceType,
        fileName,
      },
    });

    await createLog(
      "info",
      `Service with ID ${id} successfully updated`,
      user?.id,
      2000
    );

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update service: ${error.message}`,
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
        message: "Failed to update service. Please try again.",
      },
      { status: 500 }
    );
  }
}
