import { TeamMemberCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;
    user = JSON.parse(userHeader);

    const { firstName, lastName, position, yearsWorked, url, fileName } =
      await req.json();

    // Ensure that all required fields are present
    if (
      !firstName ||
      !lastName ||
      !position ||
      !yearsWorked ||
      !url ||
      !fileName
    ) {
      return NextResponse.json(
        {
          message: `Missing required fields: firstName, lastName, position, yearsWorked, url, fileName`,
        },
        { status: 400 }
      );
    }

    // Create the new team member record in the database
    await prisma.teamMember.create({
      data: {
        firstName,
        lastName,
        position,
        yearsWorked,
        url,
        fileName,
        createdAt: new Date(),
      },
    });

    // Log the successful team member creation
    await createLog(
      "info",
      `Team member ${firstName} ${lastName} created successfully`,
      user?.id,
      2000
    );

    // Return the success response
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
      `Failed to create team member: ${error.message}`,
      user?.id,
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

    // Return the error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team member",
      },
      { status: 500 }
    );
  }
}
