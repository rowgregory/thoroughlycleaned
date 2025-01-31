import { ApprovedUserErrorCodes, AuthErrorCodes } from "@/app/utils/errorCodes";
import { createLog } from "@/app/utils/logHelper";
import parseErrorStack from "@/app/utils/parseErrorStack";
import { NextRequest, NextResponse } from "next/server.js";

export async function POST(req: NextRequest) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const, // Explicitly set the type to 'strict'
      expires: new Date(0), // Set the expiration date to the past to remove the cookie
      path: "/", // Ensure the cookie is cleared for the entire domain
    };

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear cookies
    response.cookies.set("authToken", "", cookieOptions);
    response.cookies.set("userData", "", cookieOptions);

    return response;
  } catch (error: any) {
    await createLog(
      "error",
      `Failed to logout: ${error.message}`,
      "Unknown",
      ApprovedUserErrorCodes.GENERIC_SERVER_ERROR,
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
      {
        success: false,
        message: "Failed to logout",
        errorCode: AuthErrorCodes.GENERIC_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
