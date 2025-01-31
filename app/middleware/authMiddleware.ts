import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { responseTimeMiddleware } from "./responseTimeMiddleware";

export async function authMiddleware(req: NextRequest, start: number) {
  const tokenCookie = req.cookies.get("authToken");

  if (!tokenCookie) {
    // Clear cookies and redirect if no token is found
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.cookies.delete("authToken");
    res.cookies.delete("userData");
    return res;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(tokenCookie.value, secret);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(payload));

    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });

    res.cookies.set(
      "userData",
      JSON.stringify({ ...payload, isAuthenticated: true }),
      {
        path: "/",
        httpOnly: false, // Accessible to JavaScript
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    );

    // Call responseTimeMiddleware
    await responseTimeMiddleware(req, start);

    return res;
  } catch (error) {
    // Clear cookies and redirect if the token is invalid
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.cookies.delete("authToken");
    res.cookies.delete("userData");
    return res;
  }
}
