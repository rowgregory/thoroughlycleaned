import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function fetchPriceEstimates() {
  try {
    const priceEstimates = await prisma.priceEstimate.findMany();

    return NextResponse.json(
      {
        success: true,
        priceEstimates,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching price estimates:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
