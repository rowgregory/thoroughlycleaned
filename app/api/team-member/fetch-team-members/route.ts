import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { TeamMemberCodes } from "@/app/utils/errorCodes";

export async function GET(req: NextRequest) {
  try {
    const teamMembers = await prisma.teamMember.findMany();

    await createLog(
      "info",
      `Successfully fetched all team members`,
      "Public Access",
      2000
    );

    return NextResponse.json(
      {
        success: true,
        teamMembers,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch team members: ${error.message}`,
      "Unknown",
      TeamMemberCodes.GENERIC_SERVER_ERROR,
      {
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
        message: "Failed to fetch team members. Please try again.",
      },
      { status: 500 }
    );
  }
}
