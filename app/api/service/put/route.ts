"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { URL } from "url";
import { updateService } from "./updateService";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  switch (query) {
    case "UPDATE_SERVICE":
      return updateService(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
