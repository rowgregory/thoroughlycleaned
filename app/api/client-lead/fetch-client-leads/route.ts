import { NextResponse } from "next/server.js";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const clientLeads = await prisma.clientLead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        clientLeads,
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
