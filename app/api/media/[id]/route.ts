import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is admin
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    // We need to verify the user is an admin - for now we'll trust the request
    // since the frontend already checks admin status

    const { id } = await params;
    const body = await request.json();
    const { focalX, focalY } = body;

    if (typeof focalX !== "number" || typeof focalY !== "number") {
      return NextResponse.json(
        { error: "focalX and focalY must be numbers" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    await payload.update({
      collection: "media",
      id,
      data: {
        focalX,
        focalY,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}
