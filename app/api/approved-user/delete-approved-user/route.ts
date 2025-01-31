import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function DELETE(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    const { id } = await req.json();

    const approvedUser = await prisma.approvedUser.findUnique({
      where: { id },
      include: { user: true }, // Include the associated user record
    });

    if (!approvedUser) {
      await createLog(
        "error",
        `Approved user with ID ${id} not found`,
        user.id,
        ApprovedUserErrorCodes.MISSING_APPROVED_USER
      );
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete approved user",
          errorCode: ApprovedUserErrorCodes.MISSING_APPROVED_USER,
        },
        { status: 404 }
      );
    }

    // If there is an associated user, delete it
    if (approvedUser.user) {
      await prisma.user.delete({
        where: { id: approvedUser.user.id },
      });
    }

    await prisma.approvedUser.delete({
      where: { id },
    });

    // Success log
    await createLog(
      "info",
      `Approved user with ID ${id} successfully deleted`,
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
      `Failed to delete approved user: ${error.message}`,
      "Unknown",
      ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
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
        message: "Failed to delete approved user",
        errorCode: ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
