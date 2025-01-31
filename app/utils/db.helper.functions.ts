import prisma from "@/prisma/client";

// User model helpers

export const createUser = async (data: any) => {
  return await prisma.user.create({
    data,
  });
};

export const findFirstUserByPhoneNumber = async (phoneNumber: string) => {
  return await prisma.user.findFirst({
    where: { phoneNumber },
  });
};

// Approved User model helpers
export const findApprovedUserByPhoneNumber = async (phoneNumber: string) => {
  return await prisma.approvedUser.findUnique({
    where: { phoneNumber },
  });
};

export const createApprovedUser = async (data: any) => {
  return await prisma.approvedUser.create({
    data,
  });
};
