import { PhotoGalleryCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, serviceType } = await req.json();

    // Validate the input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Invalid project name" },
        { status: 400 }
      );
    }

    // Create the project in the database
    const project = await prisma.project.create({
      data: { name, serviceType },
    });

    // Return the created project
    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to create photo gallery project: ${error.message}`,
      "Unknown",
      PhotoGalleryCodes.GENERIC_SERVER_ERROR,
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
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
