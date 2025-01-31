import { ClientLeadCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phoneNumber, serviceType } = await req.json();

    if (!name || !phoneNumber || !serviceType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the user who is the primary contact
    const primaryContact = await prisma.user.findFirst({
      where: { isPrimaryContact: true },
      select: { phoneNumber: true },
    });

    // If no primary contact exists
    if (!primaryContact) {
      return NextResponse.json(
        { message: "No primary contact found" },
        { status: 400 }
      );
    }

    // Fetch the phone number of the primary contact
    const primaryContactPhoneNumber = primaryContact.phoneNumber;

    const response = await fetch(
      `${process.env.TEXTMAGIC_API_BASE_URL}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-TM-Username": process.env.TEXTMAGIC_USERNAME || "",
          "X-TM-Key": process.env.TEXTMAGIC_TOKEN || "",
        },
        body: JSON.stringify({
          phones: `+1${primaryContactPhoneNumber}`,
          text: `Hello from Thoroughly Cleaned!\n\n\nNew Client Lead\n\nName: ${name}!\nPhone: ${phoneNumber}\nService Type: ${serviceType}\n\nPlease follow up with them for further details.\n\n\nPowered by Sqysh`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: `Failed to send SMS. Status: ${response.status}, Message: ${errorData.message}`,
        },
        { status: 400 }
      );
    }

    await prisma.clientLead.create({
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
    await createLog(
      "error",
      `Failed to create client lead: ${error.message}`,
      "Unknown",
      ClientLeadCodes.GENERIC_SERVER_ERROR,
      {
        errorLocation: parseErrorStack(error),
        errorMessage: error.message,
        errorName: error.name || "UnknownError",
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
      }
    );
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
