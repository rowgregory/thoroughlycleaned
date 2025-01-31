import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import { PhotoGalleryCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function DELETE(req: NextRequest) {
  try {
    const { projectId } = await req.json();
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

    // Fetch all the PhotoGalleryImage records associated with the project
    const photoGalleryImages = await prisma.photoGalleryImage.findMany({
      where: { projectId },
    });

    if (photoGalleryImages.length === 0) {
      await createLog(
        "error",
        "No associated images found for this project",
        "Unknown",
        PhotoGalleryCodes.GENERIC_SERVER_ERROR,
        {
          errorMessage: "No associated images found for this project",
          errorName: "UnknownError",
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
        }
      );
    } else {
      // Delete the images from Firebase
      for (const image of photoGalleryImages) {
        await deleteFileFromFirebase(image.fileName, mimeType);
      }

      // Delete the images from the PhotoGalleryImage table
      await prisma.photoGalleryImage.deleteMany({
        where: { projectId },
      });
    }

    // Delete the project itself
    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project and associated images deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to delete photo gallery project: ${error.message}`,
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
        message: "Failed to delete project and images",
      },
      { status: 500 }
    );
  }
}
