import { NextResponse } from "next/server";

export async function logout() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it respects the environment
      sameSite: "strict",
      expires: new Date(0), // Set the expiration date to the past to remove it
      path: "/", // Ensure the cookie is cleared for the entire domain
    });

    return response;
  } catch (error: any) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Failed to logout", details: error.message },
      { status: 500 }
    );
  }
}
