import { NextResponse } from "next/server";
import Twilio from "twilio";

export async function sendTwilioWhatsAppMessage(request: Request) {
  const { message } = await request.json();
  console.log("MESSAGE: ", message);

  if (!message) {
    console.log("NO MESSAGE: ", message);
    return NextResponse.json(
      { error: 'Missing "message" field' },
      { status: 400 }
    );
  }

  // Initialize Twilio client
  const twilioClient = Twilio(
    process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
    process.env.NEXT_PUBLIC_TWILIO_TEST_AUTH_TOKEN
  );

  try {
    // Send the message
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      contentSid: "HX229f5a04fd0510ce1b071852155d3e75",
      contentVariables: '{"1":"409173"}',
      to: "whatsapp:+19784730396",
    });

    console.log("WE GOT HERE!");

    return NextResponse.json({
      success: true,
      message: "SMS sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { error: "Failed to send SMS", details: error.message },
      { status: 500 }
    );
  }
}
