import { generateToken } from "@/app/utils/generateToken";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function register(req: Request) {
  const { firstName, lastName, phoneNumber, consentToSMS } = await req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: { phoneNumber },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 404 }
      );
    }

    const createdUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        consentToSMS,
      },
    });

    const token = generateToken(
      { firstName, lastName, phoneNumber, isAdmin: createdUser.isAdmin },
      "1d"
    );

    const response = NextResponse.json({
      success: true,
      message: "User created successfully",
    });

    // Set token in an HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user", details: error.message },
      { status: 500 }
    );
  }
}
