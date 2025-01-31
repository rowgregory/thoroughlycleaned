import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import { UserCodes } from "@/app/utils/errorCodes";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // First, set all users' isPrimaryContact to false
    await prisma.user.updateMany({
      where: {
        isPrimaryContact: true,
      },
      data: {
        isPrimaryContact: false,
      },
    });

    // Now, update the specified user to set isPrimaryContact to true
    await prisma.user.update({
      where: { id },
      data: {
        isPrimaryContact: true,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update user: ${error.message}`,
      "Unknown",
      UserCodes.GENERIC_SERVER_ERROR,
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
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
