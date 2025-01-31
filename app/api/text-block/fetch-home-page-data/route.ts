import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

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

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const textBlocks = await prisma.textBlock.findMany({
      where: {
        type: {
          in: [
            "ABOUT_BLOCK",
            "HOME_PAGE_CLIENT_LEAD",
            "HOME_PAGE_BANNER",
            "SERVICES_BLOCK",
            "WHY_CHOOSE_US_BLOCK",
            "STATS_BLOCK",
            "WORKING_PROCESS_BLOCK",
            "TESTIMONIALS_BLOCK",
            "PHOTO_GALLERY_BLOCK",
          ],
        },
      },
    });

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
