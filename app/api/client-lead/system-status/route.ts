import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";

export async function GET() {
  try {
    // 1. Test database connection
    await prisma.$queryRaw`SELECT 1`; // Simple database query to check connection

    // 2. Test client lead creation
    const mockLead = {
      name: "Test Lead",
      phoneNumber: "11234567890",
      serviceType: "Residential",
    };

    const createdLead = await prisma.clientLead.create({
      data: mockLead,
    });

    // 3. Test client lead fetching
    await prisma.clientLead.findMany({
      take: 1, // Fetch at least one lead to verify fetching works
    });

    // 4. Test client lead update
    const mockUpdateData = { name: "Updated Lead" };

    await prisma.clientLead.update({
      where: { id: createdLead.id },
      data: mockUpdateData,
    });

    // 5. Cleanup: Delete the mock lead after testing
    await prisma.clientLead.delete({
      where: { id: createdLead.id },
    });

    // If all steps pass, return a success message
    const status = getEndpointStatus(true, "Client lead service");
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
