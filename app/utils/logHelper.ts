import prisma from "@/prisma/client";

// Helper function to create log entries
export async function createLog(
  level: string,
  message: string,
  userId: string,
  errorCode: number,
  metadata?: any
) {
  await prisma.log.create({
    data: {
      level,
      message,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
      userId,
      errorCode,
    },
  });
}
