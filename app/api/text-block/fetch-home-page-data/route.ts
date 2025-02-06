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
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const photoGalleryImages = await prisma.photoGalleryImage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
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

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const textBlocks = await prisma.textBlock.findMany();

    if (textBlocks.length === 0) {
      return NextResponse.json(
        { message: "No text blocks found" },
        { status: 202 }
      );
    }

    const transformedTextBlocks = textBlocks.reduce((acc: any, item: any) => {
      // Initialize the type group if it doesn't exist
      if (!acc[item.type]) {
        acc[item.type] = {};
      }

      // Check if the key includes the word "file"
      if (item.key.toLowerCase().includes("file")) {
        acc[item.type][item.key] = {
          value: item.value,
          mimeType: item.mimeType || null,
          fileName: item.fileName || null,
        };
      } else {
        acc[item.type][item.key] = item.value; // Assign value directly for non-media items
      }

      return acc;
    }, {});

    return NextResponse.json(
      {
        services,
        photoGalleryImages,
        testimonials,
        transformedTextBlocks,
        teamMembers,
        projects: populatedProjects,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
