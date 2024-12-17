import { jwtVerify } from "jose";
import prisma from "@/prisma/client";

interface TokenPayload {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isAdmin: boolean;
  consentToSMS: boolean;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

export async function verifyAuthToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!isTokenPayload(payload)) {
      return { isLoggedIn: false };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) return { isLoggedIn: false };

    return { isLoggedIn: true };
  } catch (error: any) {
    console.error("Token verification failed:", error);
    return { isLoggedIn: false };
  }
}

function isTokenPayload(payload: any): payload is TokenPayload {
  return (
    typeof payload === "object" &&
    typeof payload.id === "number" &&
    typeof payload.firstName === "string" &&
    typeof payload.lastName === "string" &&
    typeof payload.phoneNumber === "string" &&
    typeof payload.isAdmin === "boolean" &&
    typeof payload.consentToSMS === "boolean" &&
    typeof payload.createdAt === "string" &&
    typeof payload.updatedAt === "string" &&
    typeof payload.iat === "number" &&
    typeof payload.exp === "number"
  );
}
