import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  const userEmail = user.emailAddresses[0]?.emailAddress;

  if (!userEmail || !adminEmails.includes(userEmail)) {
    redirect("/");
  }

  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await currentUser();

  if (!user) {
    return false;
  }

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  const userEmail = user.emailAddresses[0]?.emailAddress;

  return userEmail ? adminEmails.includes(userEmail) : false;
}
