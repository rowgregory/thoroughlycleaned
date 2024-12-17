import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("authToken");

  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(tokenCookie.value, secret);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(payload));

    // Continue to the next middleware or endpoint with updated headers
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error("Invalid token:", error);

    // Redirect invalid tokens to login page
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/api/service/:path*", // Protect all API routes under /api/service
    "/admin/:path*", // Protect all admin pages
  ],
};
