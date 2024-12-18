import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const { Vonage } = require("@vonage/server-sdk");

export async function createPriceEstimate(req: NextRequest) {
  try {
    const { name, phoneNumber, serviceType } = await req.json();

    if (!name || !phoneNumber || !serviceType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send the code via SMS
    const vonage = new Vonage({
      apiKey: process.env.VONAGE_API_KEY || "",
      apiSecret: process.env.VONAGE_API_SECRET || "",
    });

    await vonage.sms.send({
      to: `+1${process.env.GREG_PHONE_NUMBER}`,
      from: `+${process.env.VONAGE_PHONE_NUMBER}`,
      text: `Hello from Thoroughly Cleaned!\n\n\nNew Price Estimate Request\n\nName: ${name}!\nPhone: ${phoneNumber}\nService Type: ${serviceType}\n\nPlease follow up with them for further details.\n\n\nPowered by Sqysh`,
    });

    await prisma.priceEstimate.create({
      data: {
        name,
        phoneNumber,
        serviceType,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating price estimate:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
