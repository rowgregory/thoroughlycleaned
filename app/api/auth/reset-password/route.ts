import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, password } = body;

    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: "Phone number and new password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Update the user's password in the database
    await prisma.user.update({
      where: {
        phoneNumber,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to reset password: ${error.message}`,
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
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
