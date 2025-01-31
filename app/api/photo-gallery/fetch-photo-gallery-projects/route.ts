import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

async function getImageDetails(id: string) {
  const image = await prisma.photoGalleryImage.findUnique({
    where: { id },
  });

  return image
    ? {
        id: image.id,
        url: image.url,
        fileName: image.fileName,
        imageRole: image.imageRole,
      }
    : null;
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Populate beforeImages and afterImages for each project
    const populatedProjects = await Promise.all(
      projects.map(async (project) => {
        // Populate before and after images based on the galleryItems array
        const populatedGalleryItems = await Promise.all(
          project.galleryItems.map(async (galleryItem: any) => {
            const before = await getImageDetails(galleryItem.before);
            const after = await getImageDetails(galleryItem.after);

            return { id: galleryItem.id, before, after };
          })
        );

        return { ...project, galleryItems: populatedGalleryItems };
      })
    );

    return NextResponse.json({ projects: populatedProjects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
