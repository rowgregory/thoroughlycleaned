"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { updateHomePage } from "./put/updateHomePage";

export async function PUT(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "UPDATE_HOME_PAGE":
      return updateHomePage(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
