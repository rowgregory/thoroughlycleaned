"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { URL } from "url";
import { createService } from "./createService";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

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
