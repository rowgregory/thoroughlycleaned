import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const serviceType = req.nextUrl.pathname.split("/").pop();

  if (!serviceType) {
    return NextResponse.json(
      { message: "Service type is required" },
      { status: 400 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        serviceType:
          serviceType.charAt(0).toUpperCase() + serviceType.substring(1),
      },
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
