"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @desc    Update the HomePage model
 * @route   PUT /api/views/home/put?endpoint=UPDATE_HOME_PAGE
 * @access  Private/admin
 */
export async function updateHomePage(req: NextRequest) {
  try {
    const formData = await req.json();
    const { id, data } = formData;

    if (!id || !data) {
      return NextResponse.json(
        { message: "Missing id or data to update" },
        { status: 400 }
      );
    }

    const updatedHomePage = await prisma.homePage.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedHomePage, { status: 200 });
  } catch (error: any) {
    console.error("Error updating homePage:", error);
    return NextResponse.json(
      { error: "Error updating homePage" },
      { status: 500 }
    );
  }
}
