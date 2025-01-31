import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const mockService = {
    name: "Mock Service",
    url: "https://mock-service.com",
    fileName: "mock-file.png",
    serviceType: "Biohazard",
    description: "This is a mock service used for health check purposes.",
  };

  try {
    // Step 1: Create the mock service
    const createdService = await prisma.service.create({
      data: mockService,
    });

    // Step 2: Update the created service (optional)
    const updatedService = await prisma.service.update({
      where: { id: createdService.id },
      data: {
        name: "Updated Mock Service",
        description: "This is an updated mock service for health check.",
      },
    });

    // Step 3: Check if the service exists and is updated correctly
    await prisma.service.findUnique({
      where: { id: updatedService.id },
    });

    // Step 4: Delete the mock service after the operation
    await prisma.service.delete({
      where: { id: updatedService.id },
    });

    const status = getEndpointStatus(true, "Cleaning solutions service");
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
