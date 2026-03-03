"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = { label: string; href: string };

export default function HamNavMenu({ links }: { links: LinkItem[] }) {
  const pathname = usePathname();
  const navLinks = links.filter((l) => l.href !== pathname);

  return (
    <ul className="menu min-h-full w-80 bg-base-200 p-4 pt-14 text-lg">
      {/* Sidebar content here */}
      {navLinks.map((link) => (
        <li
          key={link.href}
          onClick={() => {
            (
              document.getElementById("drawer-menu") as HTMLInputElement
            ).checked = false;
          }}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
