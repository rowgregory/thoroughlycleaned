import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function fetchServices() {
  try {
    const services = await prisma.service.findMany();

    return NextResponse.json(
      {
        success: true,
        services,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
