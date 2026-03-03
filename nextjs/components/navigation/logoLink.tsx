'use client';

import Link from 'next/link';

export default function LogoLink() {
  return (
    <Link
      className="btn btn-ghost btn-lg text-lg max-md:gap-x-1.5 max-md:px-2 md:text-xl"
      onClick={() => {
        (document.getElementById('drawer-menu') as HTMLInputElement).checked =
          false;
      }}
      href="/"
    >
      GuessWord
    </Link>
  );
}
