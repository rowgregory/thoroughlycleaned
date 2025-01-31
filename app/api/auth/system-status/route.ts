import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import argon2 from "argon2";
import { generateToken } from "@/app/utils/generateToken";
import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";

export async function GET() {
  const mockEmail = "mockuser@test.com";
  const mockPassword = "passworD123!";
  const mockHashedPassword = await argon2.hash(mockPassword);

  try {
    // Test database connectivity
    const dbTest = await prisma.$queryRaw`SELECT 1`;
    if (!dbTest) {
      return NextResponse.json(
        { status: "outage", message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Test user creation
    const mockUser = await prisma.user.create({
      data: {
        email: mockEmail,
        password: mockHashedPassword,
        firstName: "Mock",
        lastName: "User",
        role: "test",
        isAdmin: false,
        phoneNumber: "1234567890",
        colorCode: "#333",
        isSoundEffectsOn: false,
      },
    });

    // Validate user existence
    await prisma.user.findUnique({
      where: { email: mockEmail },
    });

    // Test login functionality
    await argon2.verify(mockUser.password, mockPassword);

    // Test token generation
    generateToken({ id: mockUser.id, email: mockUser.email }, "1d");

    // Cleanup mock user
    await prisma.user.delete({
      where: { email: mockEmail },
    });

    const status = getEndpointStatus(true, "Auth service");
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    const status = getEndpointStatus(
      false,
      extractSentenceWithArgument(err.message)
    );
    return NextResponse.json(status, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
