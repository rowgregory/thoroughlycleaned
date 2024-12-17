import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { generateToken } from "@/app/utils/generateToken";

export async function verifyCode(req: NextRequest) {
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
        { status: 400 }
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

    const token = generateToken(user, "3d");
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
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
