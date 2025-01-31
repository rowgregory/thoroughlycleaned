import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mockUser = {
    firstName: "Fake",
    lastName: "User",
    email: "fakeuser@example.com",
    password: "password123",
    phoneNumber: "1234567890",
    isAdmin: false,
    role: "user",
    consentToSMS: true,
    colorCode: "#ff0000",
    isSoundEffectsOn: true,
    isPrimaryContact: true,
  };

  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`;

    // Create a fake user
    const createdUser = await prisma.user.create({
      data: mockUser,
    });

    // Read the created user (including all fields)
    const fetchedUser = await prisma.user.findUnique({
      where: { id: createdUser.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true,
        email: true,
        phoneNumber: true,
        isAdmin: true,
        role: true,
        consentToSMS: true,
        colorCode: true,
        isSoundEffectsOn: true,
        isPrimaryContact: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!fetchedUser) {
      return NextResponse.json(
        getEndpointStatus(false, "Failed to fetch created user."),
        { status: 404 }
      );
    }

    // Update the fake user's 'isPrimaryContact' value
    const updatedUser = await prisma.user.update({
      where: { id: fetchedUser.id },
      data: { isPrimaryContact: !fetchedUser.isPrimaryContact },
    });

    // Delete the fake user to clean up
    await prisma.user.delete({
      where: { id: updatedUser.id },
    });

    // Return success status
    const status = getEndpointStatus(
      true,
      "System check passed. Fake user created, updated, and deleted successfully."
    );
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    const status = getEndpointStatus(
      false,
      extractSentenceWithArgument(err.message)
    );
    return NextResponse.json(status, { status: 500 });
  }
}
