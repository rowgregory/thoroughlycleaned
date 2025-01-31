import { ApprovedUserErrorCodes, AuthErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import { generate2FA } from "@/app/utils/string.functions";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const phoneNumber = await req.json();
  const phoneNumberString = String(phoneNumber);

  try {
    // Check if phone number exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumberString },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Incorrect credentials",
        },
        { status: 404 }
      );
    }

    // Generate a 4-digit 2FA code
    const code = generate2FA();

    // Calculate an expiration time for the code (e.g., 30 minutes)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Upsert the 2FA code into the database
    await prisma.twoFactorAuth.upsert({
      where: { phoneNumber: phoneNumberString },
      update: {
        code,
        expiresAt,
      },
      create: {
        phoneNumber: phoneNumberString,
        userName: existingUser.firstName,
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
          text: `Hello from Thoroughly Cleaned!\n\nHere is the code to reset your password: ${code}\n\nPowered by Sqysh`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to send SMS. Status: ${response.status}, Message: ${errorData.message}`
      );
    }

    return NextResponse.json({ expiresAt }, { status: 200 });
  } catch (error: any) {
    await createLog(
      "error",
      `Forget password failed: ${error.message}`,
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
        message: "Incorrect credentials",
        errorCode: AuthErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
