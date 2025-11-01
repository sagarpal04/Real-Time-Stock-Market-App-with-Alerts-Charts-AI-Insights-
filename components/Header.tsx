import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import React from "react";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  // remove duplicates by symbol while preserving order (no hooks — server component)
  const uniqueStocks = (() => {
    const map = new Map<string, any>();
    (initialStocks || []).forEach((s: any) => {
      const key = s?.symbol ?? JSON.stringify(s);
      if (!map.has(key)) map.set(key, s);
    });
    return Array.from(map.values());
  })();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={uniqueStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={uniqueStocks} />
      </div>
    </header>
  );
};
export default Header;
