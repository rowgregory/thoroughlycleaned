import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function deleteService(id: number) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: true,
          message: "Service not found",
        },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete service",
      },
      { status: 500 }
    );
  }
}
