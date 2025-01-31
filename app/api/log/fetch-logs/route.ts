import { LogErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch all logs from the database
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" }, // Optional: Order by creation date, most recent first
    });
    // Process each log entry to ensure metadata is properly formatted
    const processedLogs = logs.map((log) => {
      let processedMetadata: any = "No Metadata";

      try {
        // If metadata exists and is a string, parse it
        if (log.metadata && typeof log.metadata === "string") {
          processedMetadata = JSON.parse(log.metadata);
        } else if (log.metadata && typeof log.metadata === "object") {
          // If it's already an object, keep it as is
          processedMetadata = log.metadata;
        }
      } catch (error) {
        // In case of a parsing error, return a default message
        processedMetadata = "Invalid Metadata";
      }

      return {
        ...log,
        metadata: processedMetadata, // Add the processed metadata back into the log object
      };
    });

    // Return the processed logs to the frontend
    return NextResponse.json({ logs: processedLogs }, { status: 200 });
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to fetch logs: ${error.message}`,
      "SUPER_USER",
      LogErrorCodes.GENERIC_SERVER_ERROR,
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
      { success: false, message: "Failed to fetch logs", error: error.message },
      { status: 500 }
    );
  }
}
