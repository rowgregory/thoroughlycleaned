import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function createService(req: NextRequest) {
  try {
    const { name, image, description } = await req.json();

    if (!name || !image || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.service.create({
      data: {
        name,
        image,
        description,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
