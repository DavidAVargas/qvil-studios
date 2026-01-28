import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ isAdmin: false });
  }

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  const userEmail = user.emailAddresses[0]?.emailAddress;

  const isAdmin = userEmail ? adminEmails.includes(userEmail) : false;

  return NextResponse.json({ isAdmin });
}
