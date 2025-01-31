import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createLog } from "@/app/utils/logHelper";
import { ProfileCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

export async function PUT(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value;
  if (!authToken) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "Server configuration error: JWT_SECRET is not defined." },
      { status: 500 }
    );
  }

  try {
    const payload = jwt.verify(authToken, JWT_SECRET) as unknown;

    // Narrowing down the payload type
    if (typeof payload === "object" && payload !== null && "id" in payload) {
      const { id } = payload as { id: string };

      const {
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        colorCode,
        isSoundEffectsOn,
      } = await req.json();

      // Look for the associated approvedUser by userId
      const approvedUser = await prisma.approvedUser.findUnique({
        where: { userId: id },
      });

      if (!approvedUser) {
        // If no approvedUser is found, return an error and do not update the user
        return NextResponse.json(
          { message: "No approved user found for this account" },
          { status: 404 }
        );
      }

      // If approvedUser exists, update the user and the approvedUser
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          role,
          phoneNumber,
          colorCode,
          isSoundEffectsOn,
        },
      });

      // Update the approvedUser
      await prisma.approvedUser.update({
        where: { id: approvedUser.id },
        data: {
          phoneNumber,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        },
      });

      // Return the updated user data
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update profile: ${error.message}`,
      "Unknown",
      ProfileCodes.GENERIC_SERVER_ERROR,
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
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
