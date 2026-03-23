"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { USER_STATS } from "@/lib/constants";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Lesson", href: "/lesson" },
  { label: "Watch", href: "/watch" },
  { label: "Review", href: "/review" },
  { label: "Progress", href: "/progress" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="sticky top-0 z-50"
      style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
    >
      {/* Main bar */}
      <nav className="w-full flex items-center gap-3 px-4 sm:px-6 py-3">
        <Link
          href="/dashboard"
          className="font-bold text-lg tracking-tight shrink-0"
          style={{ color: "var(--primary)" }}
        >
          JLP
        </Link>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{ background: "var(--primary-dim)", color: "var(--primary)" }}
        >
          日本語
        </span>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-1 ml-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm px-3 py-1.5 rounded-md transition-colors"
                style={{
                  background: active ? "var(--surface-3)" : "transparent",
                  color: active ? "var(--text)" : "var(--text-muted)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--gold)" }}>
            🔥 {USER_STATS.streak}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            R
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden p-1.5 rounded-md transition-colors"
            style={{ color: "var(--text-muted)" }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="sm:hidden px-3 pb-3 flex flex-col gap-0.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-2.5 rounded-md transition-colors"
                style={{
                  background: active ? "var(--surface-3)" : "transparent",
                  color: active ? "var(--text)" : "var(--text-muted)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
