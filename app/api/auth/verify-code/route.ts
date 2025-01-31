import { ApprovedUserErrorCodes, AuthErrorCodes } from "@/app/utils/errorCodes";
import { generateToken } from "@/app/utils/generateToken";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const code = String(body);

    if (!code) {
      return NextResponse.json(
        { message: "Code is required" },
        { status: 400 }
      );
    }

    const twoFactorRecord = await prisma.twoFactorAuth.findFirst({
      where: {
        code,
        expiresAt: {
          gte: new Date(), // Ensure the code hasn't expired
        },
      },
    });

    if (!twoFactorRecord) {
      return NextResponse.json(
        { message: "Invalid or expired code", sliceName: "authApi" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        phoneNumber: twoFactorRecord.phoneNumber,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.twoFactorAuth.delete({
      where: {
        id: twoFactorRecord.id,
      },
    });

    const token = generateToken(
      { id: user.id, isAdmin: user.isAdmin, role: user.role },
      "3d"
    );

    const response = NextResponse.json({
      codeVerified: true,
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60, // 3 days
    });

    return response;
  } catch (error: any) {
    await createLog(
      "error",
      `Invalid or expired code: ${error.message}`,
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
        message: "Invalid or expired code",
        errorCode: AuthErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
