import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import { PhotoGalleryCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function DELETE(req: NextRequest) {
  const { projectId, galleryItemId, beforeFileName, afterFileName } =
    await req.json();
  try {
    const mimeType = "image";

    // Fetch the project to ensure it exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    // Find the gallery item in the project's galleryItems
    const galleryItem: any = project.galleryItems.find(
      (item: any) => item?.id === galleryItemId
    );

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found",
        },
        { status: 404 }
      );
    }

    // Fetch both before and after images
    const beforeImage = await prisma.photoGalleryImage.findUnique({
      where: { id: galleryItem.before },
    });

    const afterImage = await prisma.photoGalleryImage.findUnique({
      where: { id: galleryItem.after },
    });

    // Ensure both images exist
    if (!beforeImage || !afterImage) {
      return NextResponse.json(
        {
          success: false,
          message: "One or both images not found",
        },
        { status: 404 }
      );
    }

    // Delete both images from Firebase
    await Promise.all([
      deleteFileFromFirebase(beforeFileName, mimeType),
      deleteFileFromFirebase(afterFileName, mimeType),
    ]);

    // Delete both images from the database
    await prisma.photoGalleryImage.deleteMany({
      where: {
        id: {
          in: [beforeImage.id, afterImage.id],
        },
      },
    });

    // Remove the gallery item from the galleryItems array in the Project model
    const updatedGalleryItems: any = project.galleryItems.filter(
      (item: any) => item.id !== galleryItemId
    );

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { galleryItems: updatedGalleryItems },
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

    return NextResponse.json(
      {
        project: projectWithPopulatedGalleryItems,
        message: "Photos and gallery item deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to delete photo gallery project pair: ${error.message}`,
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
      {
        success: false,
        message: "Failed to delete photos and update project",
        galleryItemId,
      },
      { status: 500 }
    );
  }
}
