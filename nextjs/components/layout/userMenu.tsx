"use client";
// External imports
import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
// Internal imports
import Avatar from "@/components/ui/avatar";
import { signOut } from "@/lib/auth-client";

export default function UserMenu({
  image,
  name,
}: Readonly<{ image?: string; name?: string }>) {
  const [isPending, setIsPending] = useState(() => false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await signOut();
      console.log("Logout successful, redirecting to login");
      if (pathname === "/dashboard") {
        router.push("/login");
      }
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error instanceof Error ? error.message : String(error));
      setIsPending(false);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div role="button" tabIndex={0} className="btn btn-circle btn-ghost">
        <Avatar iconUrl={image || undefined} name={name || undefined} />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu mt-4 w-52 items-start rounded-box bg-base-100 p-2 text-lg shadow *:w-full"
      >
        {pathname !== "/dashboard" && (
          <li>
            <Link
              onClick={() => (document.activeElement as HTMLElement)?.blur()}
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {pathname !== "/settings" && (
          <li>
            <Link
              onClick={() => (document.activeElement as HTMLElement)?.blur()}
              href="/settings"
            >
              Settings
            </Link>
          </li>
        )}
        <li>
          <button disabled={isPending} onClick={handleLogout}>
            Logout
          </button>
        </li>
        {error && <li className="alert alert-error text-error">{error}</li>}
      </ul>
    </div>
  );
}
