"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { register } from "./register";
import { verifyPhoneNumber } from "./verifyPhoneNumber";
import { logout } from "./logout";

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("endpoint");

  switch (query) {
    case "REGISTER":
      return register(req);
    case "VERIFY_PHONE_NUMBER":
      return verifyPhoneNumber(req);
    case "LOGOUT":
      return logout();
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
