import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/authHelpers";
import Link from "next/dist/client/link";
import Card from "@/components/ui/card";

export default async function Settings() {
  const session = await getServerSession();
  if (!session) {
    console.log("No session found, redirecting to login from dashboard");
    redirect("/login");
    return null;
  } else if (!session.user?.email) {
    console.log("Session found but no user email, redirecting to update-email");
    redirect("/update-email");
    return null;
  } else if (session.user.email && !session.user.emailVerified) {
    console.log(
      "Session found but email not verified, redirecting to update-email",
    );
    redirect("/update-email");
    return null;
  }
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-full flex-col items-center lg:flex-row-reverse">
          <div className="prose prose-lg items-center text-center">
            <h1 className="font-bold">Manage Settings</h1>
            <nav className="flex flex-col items-center gap-5 *:w-60 sm:flex-row">
              <Link href="/update-email" className="not-prose btn btn-primary">
                Update Email
              </Link>
              <Link
                href="/change-password"
                className="not-prose btn btn-primary"
              >
                Change Password
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
