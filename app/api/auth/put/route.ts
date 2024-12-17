"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { verifyCode } from "./verifyCode";

export async function PUT(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "VERIFY_CODE":
      return verifyCode(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
