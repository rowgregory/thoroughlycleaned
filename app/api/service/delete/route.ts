"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { deleteService } from "./deleteService";

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const query = req.nextUrl.searchParams.get("endpoint");

  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  switch (query) {
    case "DELETE_SERVICE":
      return deleteService(numericId);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
