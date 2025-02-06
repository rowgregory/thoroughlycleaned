import { ApprovedUserErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function PATCH(req: NextRequest) {
  let user = null;
  try {
    const userHeader = req.headers.get("x-user")!;

    user = JSON.parse(userHeader);

    const { id, name, phoneNumber } = await req.json();

    if (!id || !name || !phoneNumber) {
      return NextResponse.json(
        {
          message: `Missing required fields id:${id}, name:${name}, phone-number:${phoneNumber}`,
        },
        { status: 400 }
      );
    }

    const existingApprovedUser = await prisma.approvedUser.findUnique({
      where: { phoneNumber, NOT: { id } },
    });

    if (existingApprovedUser) {
      return NextResponse.json(
        { message: "Phone number is already in use" },
        { status: 400 }
      );
    }

    const updatedApprovedUser = await prisma.approvedUser.update({
      where: { id },
      data: {
        name,
        phoneNumber,
      },
    });

    if (updatedApprovedUser.userId) {
      await prisma.user.update({
        where: { id: updatedApprovedUser.userId || undefined },
        data: {
          firstName: name?.split?.(" ")?.[0],
          lastName: name?.split?.(" ")?.[1],
          phoneNumber: updatedApprovedUser.phoneNumber,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to update approved user: ${error.message}`,
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
      {
        success: false,
        message: "Failed to update approved user",
        errorCode: ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
