import { NextRequest, NextResponse } from "next/server.js";
import { createPriceEstimate } from "./createPriceEstimate";

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "CREATE_PRICE_ESTIMATE":
      return createPriceEstimate(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
