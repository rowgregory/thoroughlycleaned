import { NextRequest, NextResponse } from "next/server.js";
import { createService } from "./createService";

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "CREATE_SERVICE":
      return createService(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
