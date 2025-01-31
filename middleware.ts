import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./app/middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  const start = performance.now();

  // Call authMiddleware
  const authResponse = await authMiddleware(req, start);
  if (authResponse) return authResponse;

  // Default response if no middleware returns a response
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/approved-user/create-approved-user",
    "/api/approved-user/delete-approved-user",
    "/api/approved-user/fetch-approved-users",
    "/api/approved-user/system-status",
    "/api/approved-user/update-approved-user",
    "/api/client-lead/fetch-client-leads",
    "/api/client-lead/system-status",
    "/api/client-lead/update-client-lead",
    "/api/photo-gallery/create-and-attach-photo-gallery-image",
    "/api/photo-gallery/create-photo-gallery-project",
    "/api/photo-gallery/delete-photo-gallery-project",
    "/api/photo-gallery/delete-photo-gallery-project-pair",
    "/api/photo-gallery/system-status",
    "/api/photo-gallery/update-photo-gallery-project",
    "/api/profile/get-profile-from-id/:id",
    "/api/profile/system-status",
    "/api/profile/update-profile",
    "/api/service/create-service",
    "/api/service/delete-service",
    "/api/service/system-status",
    "/api/service/update-service",
    "/api/testimonial/create-testimonial",
    "/api/testimonial/delete-testimonial",
    "/api/testimonial/system-status",
    "/api/testimonial/update-testimonial",
    "/api/text-block/system-status",
    "/api/text-block/update-text-block",
    "/api/user/fetch-users",
    "/api/user/system-status",
    "/api/user/update-user",
  ],
};
