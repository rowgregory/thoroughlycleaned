import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { generate2FA } from "@/app/utils/string.functions";
import { createLog } from "@/app/utils/logHelper";
import { ApprovedUserErrorCodes, AuthErrorCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const existingTwoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { id },
    });

    if (!existingTwoFactorAuth) {
      return NextResponse.json({
        message: "No record found for the provided twoFactorAuthId",
      });
    }

    // Generate a new 4-digit 2FA code
    const code = generate2FA();

    // Calculate an expiration time for the code (e.g., 30 minutes)
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const { phoneNumber, userName } = existingTwoFactorAuth;

    const twoFactorAuthId = await prisma.twoFactorAuth.upsert({
      where: { id },
      update: {
        code,
        expiresAt,
      },
      create: {
        phoneNumber,
        userName,
        code,
        expiresAt,
      },
    });

    // Send the code via TextMagic API
    const response = await fetch(
      `${process.env.TEXTMAGIC_API_BASE_URL}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-TM-Username": process.env.TEXTMAGIC_USERNAME || "",
          "X-TM-Key": process.env.TEXTMAGIC_TOKEN || "",
        },
        body: JSON.stringify({
          phones: `+1${phoneNumber}`,
          text: `Hello from Thoroughly Cleaned!\n\nHere is the code to verify: ${code}\n\nPowered by Sqysh`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to send SMS. Status: ${response.status}, Message: ${errorData.message}`
      );
    }

    return NextResponse.json({
      phoneNumberVerified: true,
      revealVerifyCodeForm: true,
      expiresAt,
      twoFactorAuthId: twoFactorAuthId.id,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Invalid or expired register code: ${error.message}`,
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
        message: "Invalid or expired register code",
        errorCode: AuthErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
