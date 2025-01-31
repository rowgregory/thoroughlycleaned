import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mockApprovedUser = {
    name: "Mock User",
    phoneNumber: "1234567890",
  };

  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`;

    // Create a new ApprovedUser
    const createdApprovedUser = await prisma.approvedUser.create({
      data: mockApprovedUser,
    });

    // Read the created ApprovedUser
    const approvedUser = await prisma.approvedUser.findUnique({
      where: { id: createdApprovedUser.id },
    });

    // Update the ApprovedUser
    const updatedApprovedUser = await prisma.approvedUser.update({
      where: { id: approvedUser?.id },
      data: { phoneNumber: "8884563214" },
    });

    await prisma.approvedUser.delete({
      where: { id: updatedApprovedUser.id },
    });

    const status = getEndpointStatus(true, "Approved User service");
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    const status = getEndpointStatus(
      false,
      extractSentenceWithArgument(err.message)
    );
    return NextResponse.json(status, { status: 500 });
  }
}
