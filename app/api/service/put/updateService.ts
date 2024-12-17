import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function updateService(req: Request) {
  try {
    const { id, name, image, description } = await req.json();

    if (!id || !name || !image || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.service.update({
      where: { id },
      data: {
        name,
        image,
        description,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
