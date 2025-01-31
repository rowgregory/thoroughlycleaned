import { ProfileCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        colorCode: true,
        isSoundEffectsOn: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile: user }, { status: 200 });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch profile from id: ${error.message}`,
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
