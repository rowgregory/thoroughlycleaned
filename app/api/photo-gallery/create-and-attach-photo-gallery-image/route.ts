import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createLog } from "@/app/utils/logHelper";
import { PhotoGalleryCodes } from "@/app/utils/errorCodes";
import parseErrorStack from "@/app/utils/parseErrorStack";

// Define the structure for the PhotoGalleryImage and combinedPhotos
interface CombinedPhoto {
  before: {
    url: string;
    fileName: string;
    imageRole: string;
  };
  after: {
    url: string;
    fileName: string;
    imageRole: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    const {
      combinedPhotos,
      projectId,
    }: { combinedPhotos: CombinedPhoto; projectId: string } = body;

    // Validate the input
    if (!combinedPhotos || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields: combinedPhotos or projectId" },
        { status: 400 }
      );
    }

    // Step 1: Create PhotoGalleryImage for each pair of before and after images
    const galleryItemsToCreate: any[] = [];

    // Use the combinedPhotos object directly instead of an array
    if (combinedPhotos.before && combinedPhotos.after) {
      // Create the "before" image
      const createdBeforeImage = await prisma.photoGalleryImage.create({
        data: {
          url: combinedPhotos.before.url,
          fileName: combinedPhotos.before.fileName,
          imageRole: "before",
          projectId,
        },
      });

      // Create the "after" image
      const createdAfterImage = await prisma.photoGalleryImage.create({
        data: {
          url: combinedPhotos.after.url,
          fileName: combinedPhotos.after.fileName,
          imageRole: "after",
          projectId,
        },
      });

      // Push the created images to galleryItemsToCreate
      galleryItemsToCreate.push({
        id: randomUUID(),
        before: createdBeforeImage.id,
        after: createdAfterImage.id,
      });
    } else {
      throw new Error("Both before and after images are required");
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    // Step 2: Update the Project's galleryItems with the new pair of images (before and after)
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        galleryItems: {
          set: project?.galleryItems
            ? [...project.galleryItems, ...galleryItemsToCreate]
            : galleryItemsToCreate,
        },
      },
    });

    const populatedGalleryItems = await Promise.all(
      updatedProject.galleryItems.map(async (galleryItem: any) => {
        const before = galleryItem.before
          ? await prisma.photoGalleryImage.findUnique({
              where: { id: galleryItem.before },
            })
          : null;

        const after = galleryItem.after
          ? await prisma.photoGalleryImage.findUnique({
              where: { id: galleryItem.after },
            })
          : null;

        return {
          id: galleryItem.id,
          before, // Full details of the "before" image
          after, // Full details of the "after" image
        };
      })
    );

    const projectWithPopulatedGalleryItems = {
      ...updatedProject,
      galleryItems: populatedGalleryItems,
    };

    // Return the created galleryItems ids as a response
    return NextResponse.json(
      {
        project: projectWithPopulatedGalleryItems,
      },
      { status: 201 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to create photo gallery images: ${error.message}`,
      "Unknown",
      PhotoGalleryCodes.GENERIC_SERVER_ERROR,
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
      { message: "Failed to create photo gallery images" },
      { status: 500 }
    );
  }
}
