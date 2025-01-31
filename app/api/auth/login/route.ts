import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import prisma from "@/prisma/client";
import { generateToken } from "@/app/utils/generateToken";
import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";
import { createLog } from "@/app/utils/logHelper";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
        colorCode: user.colorCode,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      "3d" // Token expiration
    );

    const services = await prisma.service.findMany();

    // Create a response with a secure HTTP cookie
    const response = NextResponse.json({
      auth: {
        isAuthenticated: true,
        userId: user.id,
        role: user.role,
        colorCode: user.colorCode,
      },
      services,
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60, // 3 days
      path: "/", // Cookie applies to the entire domain
    });

    return response;
  } catch (error: any) {
    await createLog(
      "error",
      `Login failed: ${error.message}`,
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
      { message: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
