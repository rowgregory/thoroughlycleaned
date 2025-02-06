import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createLog } from "@/app/utils/logHelper";
import { TeamMemberCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function PUT(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    const { id, firstName, lastName, position, yearsWorked, url, fileName } =
      await req.json();

    // Validate the input data
    if (
      !id ||
      !firstName ||
      !lastName ||
      !position ||
      !yearsWorked ||
      !url ||
      !fileName
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Check if the team member exists
    const existingTeamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!existingTeamMember) {
      await createLog(
        "error",
        `Team member not found with id ${id}`,
        user.id,
        TeamMemberCodes.MISSING_TEAM_MEMBER,
        {
          errorMessage: `Team member not found with id ${id}`,
          errorName: "NotFoundError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
      return NextResponse.json(
        {
          success: false,
          message: "Team member not found",
        },
        { status: 404 }
      );
    }

    await prisma.teamMember.update({
      where: { id },
      data: {
        firstName,
        lastName,
        position,
        yearsWorked,
        url,
        fileName,
        updatedAt: new Date(),
      },
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
      `Failed to update team member: ${error.message}`,
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

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update team member. Please try again.",
      },
      { status: 500 }
    );
  }
}
