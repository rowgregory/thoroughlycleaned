"use server";

import { NextRequest, NextResponse } from "next/server.js";
import { URL } from "url";
import { sendTwilioSMSMessage } from "./sendTwilioSMSMessage";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");
  console.log("QUERY ", query);

  switch (query) {
    case "SEND_TWILIO_SMS_MESSAGE":
      return sendTwilioSMSMessage(req);
    default:
      return NextResponse.json(
        { message: "Invalid endpoint" },
        { status: 400 }
      );
  }
}
