import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";

export async function GET() {
  const mockPassword = "passworD123!";
  const mockHashedPassword = await argon2.hash(mockPassword);

  const mockUser = {
    id: "mock-user-id",
    email: "mockuser@example.com",
    role: "client",
    isAdmin: false,
    firstName: "test",
    lastName: "user",
    phoneNumber: "7894561230",
    password: mockHashedPassword,
    colorCode: "#333",
    isSoundEffectsOn: false,
  };
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }

  try {
    const mockAuthToken = jwt.sign(mockUser, JWT_SECRET, { expiresIn: "1h" });

    // Verify the JWT token using jsonwebtoken's verify function
    const payload = jwt.verify(mockAuthToken, JWT_SECRET);

    // Proceed with the user look-up and validation using Prisma
    let user = await prisma.user.findUnique({
      where: { id: (payload as any).id }, // Access the id from the decoded payload
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    // If the user doesn't exist, create the user
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: (payload as any).id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
          isAdmin: mockUser.isAdmin,
          phoneNumber: mockUser.phoneNumber,
          password: mockUser.password,
          colorCode: mockUser.colorCode,
          isSoundEffectsOn: mockUser.isSoundEffectsOn,
        },
      });
    }

    let approvedUser = await prisma.approvedUser.findUnique({
      where: { userId: (payload as any).id }, // Access the userId from the decoded payload
    });

    // If the approvedUser doesn't exist, create the approvedUser
    if (!approvedUser) {
      approvedUser = await prisma.approvedUser.create({
        data: {
          userId: user.id,
          phoneNumber: "1234567890",
          name: `${user.firstName} ${user.lastName}`,
        },
      });
    }

    // Proceed with any updates (if needed)
    await prisma.user.update({
      where: { id: user.id },
      data: { firstName: "UpdatedFirstName", lastName: "UpdatedLastName" },
    });

    await prisma.approvedUser.update({
      where: { id: approvedUser.id },
      data: {
        phoneNumber: "1234567890",
        name: "UpdatedFirstName UpdatedLastName",
      },
    });

    // Delete the mock user and approvedUser after operations
    await prisma.user.delete({
      where: { id: (payload as any).id },
    });

    await prisma.approvedUser.delete({
      where: { id: approvedUser.id },
    });

    const status = getEndpointStatus(true, "Profile service");
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    const status = getEndpointStatus(
      false,
      extractSentenceWithArgument(err.message)
    );
    return NextResponse.json(status, { status: 500 });
  }
}
