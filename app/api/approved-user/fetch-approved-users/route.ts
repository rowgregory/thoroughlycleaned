import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;

    user = JSON.parse(userHeader);

    const approvedUsers = await prisma.approvedUser.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        approvedUsers,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch approved users: ${error.message}`,
      user.id,
      ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
      {
        errorStack: error.stack,
        errorMessage: error.message,
      }
    );
    return NextResponse.json(
      {
        message: "Failed to fetch approved users",
        errorCode: ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
