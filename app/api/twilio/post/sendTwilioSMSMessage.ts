import { NextResponse } from "next/server";
import Twilio from "twilio";

export async function sendTwilioSMSMessage(request: Request) {
  const code = await request.json();
  console.log("CODE: ", code);

  if (!code) {
    console.log("NO CODE: ", code);
    return NextResponse.json(
      { error: 'Missing "code" field' },
      { status: 400 }
    );
  }

  // Initialize Twilio client
  const twilioClient = Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_TEST_AUTH_TOKEN
  );

  try {
    // Send the message
    const message = await twilioClient.messages.create({
      body: "This is a test! I hope it works!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+19784730396",
    });

    console.log("Message Body: ", message.body);
    console.log("Message Id: ", message.sid);

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
