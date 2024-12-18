import { NextRequest, NextResponse } from "next/server.js";
import { fetchPriceEstimates } from "./fetchPriceEstimates";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "FETCH_PRICE_ESTIMATES":
      return fetchPriceEstimates();
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
