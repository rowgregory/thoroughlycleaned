"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { URL } from "url";
import { updateHomePage } from "./put/updateHomePage";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");
  console.log("QUERY ", query);

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
