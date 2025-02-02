import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import { TeamMemberCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function DELETE(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    let { id, fileName } = await req.json();

    // Find the TeamMember record by ID
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    // If TeamMember doesn't exist, log and return error
    if (!teamMember) {
      await createLog(
        "error",
        `TeamMember not found with id ${id}`,
        user.id,
        TeamMemberCodes.MISSING_TEAM_MEMBER,
        {
          errorMessage: `TeamMember not found with id ${id}`,
          errorName: "UnknownError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
      return NextResponse.json(
        {
          success: false,
          message: "TeamMember not found",
        },
        { status: 404 }
      );
    }

    // Optionally delete the file from Firebase if necessary
    if (fileName) {
      await deleteFileFromFirebase(fileName);
    }

    // Delete the TeamMember record
    await prisma.teamMember.delete({
      where: { id },
    });

    // Log the successful deletion
    await createLog(
      "info",
      `TeamMember with ID ${id} successfully deleted`,
      user?.id,
      2000
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Log the error
    await createLog(
      "error",
      `Failed to delete TeamMember: ${error.message}`,
      user.id,
      TeamMemberCodes.GENERIC_SERVER_ERROR,
      {
        errorLocation: parseErrorStack(error),
        errorMessage: error.message,
        errorName: error.name || "UnknownError",
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
      }
    );

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete TeamMember. Please try again.",
      },
      { status: 500 }
    );
  }
}
