import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/authHelpers";
import StatsCard from "@/components/ui/statsCard";
import { getUserStats } from "@/lib/db/stats";

export default async function Dashboard() {
  const session = await getServerSession();
  const stats = session ? getUserStats(session.user.id) : undefined;
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
  const nameOrEmail =
    session.user?.name?.split(" ")[0] ||
    session.user?.email.split("@")[0] ||
    "User";
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col text-center">
          <div className="prose prose-lg text-center">
            <h1 className="mb-0 font-bold">Dashboard</h1>
            <p className="text-nowrap">Welcome, {nameOrEmail}!</p>
            <Link className="not-prose btn btn-primary" href="/game">
              Play Game
            </Link>
            <h2>Current Stats</h2>
          </div>
          <StatsCard stats={stats} />
        </div>
      </div>
    </main>
  );
}
