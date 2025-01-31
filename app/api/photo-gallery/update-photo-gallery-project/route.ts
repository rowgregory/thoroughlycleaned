import { PhotoGalleryCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { id, name, serviceType } = body;

    // Validate the input
    if (!id || !name) {
      return NextResponse.json(
        { error: "Missing required fields: id and name" },
        { status: 400 }
      );
    }

    // Update the project in the database
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, serviceType },
    });

    // Return the updated project
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update photo gallery project: ${error.message}`,
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
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
