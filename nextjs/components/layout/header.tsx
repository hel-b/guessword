import HamDrawer from "@/components/navigation/hamDrawer";
import ThemeController from "@/components/ui/themeController";
import HamNavMenu from "@/components/layout/hamNavMenu";
import LogoLink from "@/components/navigation/logoLink";
import { getServerSession } from "@/lib/authHelpers";
import UserMenu from "@/components/layout/userMenu";

const NAV_LINKS = [
  { label: "Home", href: "/", auth: "any" },
  { label: "Login", href: "/login", auth: "out" },
  { label: "Play Game", href: "/game", auth: "any" },
  { label: "Dashboard", href: "/dashboard", auth: "in" },
] as const;

export default async function Header() {
  const session = await getServerSession();
  const isLoggedIn = !!session?.user;
  const links = NAV_LINKS.filter(
    (l) => l.auth === "any" || (l.auth === "in" ? isLoggedIn : !isLoggedIn),
  );
  return (
    <header className="sticky top-0 z-30">
      <nav className="navbar gap-x-3 bg-base-100 shadow">
        <div className="flex-none">
          <HamDrawer>
            <HamNavMenu links={links} />
          </HamDrawer>
        </div>
        <div className="z-10 flex-1">
          <LogoLink />
        </div>
        <div className="flex items-center gap-x-3">
          {session?.user && (
            <UserMenu
              image={session.user.image || undefined}
              name={session.user.name}
            />
          )}
          <ThemeController />
        </div>
      </nav>
    </header>
  );
}
