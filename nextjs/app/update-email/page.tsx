import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/authHelpers";
import StatsCard from "@/components/ui/statsCard";
import { getUserStats } from "@/lib/db/stats";
import EmailForm from "@/components/auth/emailCard";

export default async function UpdateEmail() {
  const session = await getServerSession();
  const stats = session ? getUserStats(session.user.id) : undefined;
  if (!session) {
    console.log("No session found, redirecting to login from dashboard");
    redirect("/login");
    return null;
  }
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-full flex-col lg:flex-row-reverse">
          <div className="prose prose-lg text-center lg:text-left">
            <h1 className="font-bold text-nowrap">Update Email</h1>
            <p>
              Please provide an email where you can receive notifications. Once
              submitted, check your inbox and follow the link in our
              confirmation email to validate.
            </p>
          </div>
          <EmailForm />
        </div>
      </div>
    </main>
  );
}
