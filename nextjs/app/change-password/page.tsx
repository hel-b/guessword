import { getServerSession } from "@/lib/authHelpers";
// import { headers } from "next/headers";
import ClientPasswords from "@/components/auth/clientPasswords";

export default async function ResetPassword() {
  const session = await getServerSession();

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-full flex-col lg:flex-row-reverse">
          <ClientPasswords isSession={!!session} />
        </div>
      </div>
    </main>
  );
}
