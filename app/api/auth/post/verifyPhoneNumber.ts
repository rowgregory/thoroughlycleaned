import generate2FA from "@/app/utils/generate2FA";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const { Vonage } = require("@vonage/server-sdk");

export async function verifyPhoneNumber(req: NextRequest) {
  try {
    if (req.headers.get("content-length") === "0") {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const phoneNumber = String(body);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid credentials", sliceName: "authApi" },
        { status: 404 }
      );
    }

    let userName = null;
    if (phoneNumber.toString() === process.env.GREG_PHONE_NUMBER) {
      userName = "Greg";
    } else if (phoneNumber.toString() === process.env.ADRIANA_PHONE_NUMBER) {
      userName = "Adriana";
    } else {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 404 }
      );
    }

    // Generate a 4-digit 2FA code
    const code = generate2FA();

    // Calculate an expiration time for the code (e.g., 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.twoFactorAuth.upsert({
      where: { phoneNumber },
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

    // Send the code via SMS
    const vonage = new Vonage({
      apiKey: process.env.VONAGE_API_KEY || "",
      apiSecret: process.env.VONAGE_API_SECRET || "",
    });

    await vonage.sms.send({
      to: `+1${process.env.GREG_PHONE_NUMBER}`,
      from: `+${process.env.VONAGE_PHONE_NUMBER}`,
      text: `Hello from Thoroughly Cleaned!\n\nHere is the code to login: ${code}\n\n\nPowered by Sqysh`,
    });

    return NextResponse.json({
      success: true,
      message: `Verification code sent successfully to ${userName}`,
    });
  } catch (error: any) {
    console.error("Error during phone number verification:", error);
    return NextResponse.json(
      { error: "Failed to send verification code", details: error.message },
      { status: 500 }
    );
  }
}
