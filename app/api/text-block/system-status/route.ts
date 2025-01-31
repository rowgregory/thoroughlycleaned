import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";

export async function GET() {
  const mockTextBlock: any = {
    key: "mockTextBlock",
    value: "Welcome to Our Mock Service",
    type: "HOME_BANNER",
    mimeType: "",
    fileName: "",
  };

  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`;

    // Create a new TextBlock
    const createdTextBlock = await prisma.textBlock.create({
      data: mockTextBlock,
    });

    // Read the created TextBlock
    const textBlock = await prisma.textBlock.findUnique({
      where: { id: createdTextBlock.id },
    });

    // Update the TextBlock
    const updatedTextBlock = await prisma.textBlock.update({
      where: { id: textBlock?.id },
      data: { value: "Updated welcome message" },
    });

    // Delete the TextBlock
    await prisma.textBlock.delete({
      where: { id: updatedTextBlock.id },
    });

    // Final service status
    const status = getEndpointStatus(true, "Text Block service");
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
