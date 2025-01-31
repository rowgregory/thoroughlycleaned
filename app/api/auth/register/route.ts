import {
  createApprovedUser,
  createUser,
  findApprovedUserByPhoneNumber,
  findFirstUserByPhoneNumber,
} from "@/app/utils/db.helper.functions";
import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import { generate2FA } from "@/app/utils/string.functions";
import prisma from "@/prisma/client";
import { hash } from "argon2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, phoneNumber, consentToSMS, email, password } =
    body;

  try {
    if (
      process.env.SUPER_USER === email &&
      process.env.SUPER_USER_PHONE_NUMBER === phoneNumber
    ) {
      const hashedPassword = await hash(password);

      const createdUser = await createUser({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        phoneNumber,
        isAdmin: true,
        role: "super-user",
        consentToSMS,
        colorCode: "#16A34A",
      });

      await createApprovedUser({
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        phoneNumber,
        userId: createdUser.id,
        createdAt: new Date(),
      });
    } else {
      // Find the matching approved user by phone number
      const approvedUser = await findApprovedUserByPhoneNumber(phoneNumber);

      if (!approvedUser) {
        return NextResponse.json(
          { message: "Invalid credentials, not approved user" },
          { status: 404 }
        );
      }

      const existingUser = await findFirstUserByPhoneNumber(phoneNumber);

      if (existingUser) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 404 }
        );
      }

      const hashedPassword = await hash(password);

      const createdUser = await createUser({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        phoneNumber,
        isAdmin: true,
        role: "admin",
        consentToSMS,
        colorCode: "#16A34A",
      });

      await prisma.approvedUser.update({
        where: { phoneNumber },
        data: {
          userId: createdUser.id,
        },
      });
    }

    // Generate a 4-digit 2FA code
    const code = generate2FA();

    // Calculate an expiration time for the code (e.g., 30 minutes)
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const twoFactorAuth = await prisma.twoFactorAuth.upsert({
      where: { phoneNumber },
      update: {
        code,
        expiresAt,
      },
      create: {
        phoneNumber,
        userName: firstName,
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
          text: `Hello from Thoroughly Cleaned!\n\nHere is the code to finish creating your account: ${code}\n\nPowered by Sqysh`,
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
      twoFactorAuthId: twoFactorAuth.id,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to registerl: ${error.message}`,
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
      { error: "Failed to create user", details: error.message },
      { status: 500 }
    );
  }
}
