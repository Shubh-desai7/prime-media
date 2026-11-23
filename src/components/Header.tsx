"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="wrap header__in">
        <Link className="header__logo" href="/" aria-label="Prime Media home" onClick={() => setOpen(false)}>
          <Image src="/logo-sm.png" alt="Prime Media — Your Idea on Our Media" width={360} height={172} priority />
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link className="btn btn--lime" href="/contact">Check your date</Link>
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          <span />
        </button>
      </div>
      <nav id="mnav" className={`mnav${open ? " open" : ""}`} aria-label="Mobile">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        <Link className="btn btn--lime" href="/contact" onClick={() => setOpen(false)}>Check your date</Link>
      </nav>
    </header>
  );
}
