import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { UserCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        phoneNumber: true,
        id: true,
        isPrimaryContact: true,
        colorCode: true,
      },
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch users: ${error.message}`,
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
