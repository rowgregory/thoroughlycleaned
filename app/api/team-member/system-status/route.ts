import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mockTeamMember = {
    firstName: "John",
    lastName: "Doe",
    position: "Developer",
    yearsWorked: "3",
    url: "https://john-doe-profile.com",
    fileName: "john-doe-profile.png",
  };

  try {
    // Step 1: Create the mock team member
    const createdTeamMember = await prisma.teamMember.create({
      data: mockTeamMember,
    });

    // Step 2: Update the created team member (optional)
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: createdTeamMember.id },
      data: {
        firstName: "Updated John",
        lastName: "Updated Doe",
        position: "Lead Developer",
        yearsWorked: "4",
        url: "https://updated-john-doe-profile.com",
        fileName: "updated-john-doe-profile.png",
      },
    });

    // Step 3: Check if the team member exists and is updated correctly
    await prisma.teamMember.findUnique({
      where: { id: updatedTeamMember.id },
    });

    // Step 4: Delete the mock team member after the operation
    await prisma.teamMember.delete({
      where: { id: updatedTeamMember.id },
    });

    const status = getEndpointStatus(true, "Team Member Service");
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
