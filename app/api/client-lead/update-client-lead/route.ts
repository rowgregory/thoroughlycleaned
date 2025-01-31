import { ClientLeadCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

export async function PATCH(req: NextRequest) {
  try {
    const { id, haveContacted } = await req.json();

    if (haveContacted === undefined || !id) {
      return NextResponse.json(
        {
          message: `Missing required fields id:${id}, haveContacted:${haveContacted}`,
        },
        { status: 400 }
      );
    }

    await prisma.clientLead.update({
      where: { id },
      data: {
        haveContacted,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to create update lead: ${error.message}`,
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
