import { createApprovedUser } from "@/app/utils/db.helper.functions";
import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let user = null;
  try {
    let { name, phoneNumber } = await req.json();

    if (!name || !phoneNumber) {
      return NextResponse.json(
        {
          message: `Missing required fields name:${name}, phone-number:${phoneNumber}`,
        },
        { status: 400 }
      );
    }

    const userHeader = req.headers.get("x-user")!; // Exlmation point <----

    user = JSON.parse(userHeader);

    const existingApprovedUser = await prisma.approvedUser.findUnique({
      where: { phoneNumber },
    });

    if (existingApprovedUser) {
      return NextResponse.json(
        { message: "Phone number is already in use" },
        { status: 400 }
      );
    }

    await createApprovedUser({
      name,
      phoneNumber,
      createdAt: new Date(),
    });

    await createLog(
      "info",
      `Approved user successfully created`,
      user?.id,
      2000,
      { name }
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
      `Failed to create approved user: ${error.message}`,
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
        message: "Failed to create approved user",
      },
      { status: 500 }
    );
  }
}
