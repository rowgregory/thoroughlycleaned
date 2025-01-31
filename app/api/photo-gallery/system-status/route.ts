import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {
  extractSentenceWithArgument,
  getEndpointStatus,
} from "@/app/utils/admin.functions";

// Health check for the photo gallery service
export async function GET() {
  try {
    // 1. Test database connection
    await prisma.$queryRaw`SELECT 1`; // Simple database query to check connection

    // 2. Test project (album) creation
    const mockProject = {
      name: "Test Album",
      serviceType: "Residential",
    };

    const createdProject = await prisma.project.create({
      data: mockProject,
    });

    // 3. Test adding photo pairs to the project
    const mockPhoto = {
      projectId: createdProject.id,
      url: "http://example.com/photo1.jpg",
      fileName: "photo1.jpg",
      imageRole: "before",
    };

    await prisma.photoGalleryImage.create({
      data: mockPhoto,
    });

    // 4. Test fetching gallery images
    await prisma.photoGalleryImage.findMany({
      where: { projectId: createdProject.id },
      orderBy: { createdAt: "desc" },
    });

    // 5. Cleanup: Delete the mock project and its images
    await prisma.photoGalleryImage.deleteMany({
      where: { projectId: createdProject.id },
    });

    await prisma.project.delete({
      where: { id: createdProject.id },
    });

    // If all steps pass
    const status = getEndpointStatus(true, "Photo gallery service");
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
