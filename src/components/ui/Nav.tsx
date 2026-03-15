"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { USER_STATS } from "@/lib/constants";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Lesson", href: "/lesson" },
  { label: "Watch", href: "/watch" },
  { label: "Review", href: "/review" },
  { label: "Progress", href: "/progress" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
      className="w-full flex items-center gap-6 px-6 py-3 sticky top-0 z-50"
    >
      <Link
        href="/dashboard"
        className="font-bold text-lg tracking-tight"
        style={{ color: "var(--primary)" }}
      >
        JLP
      </Link>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{
          background: "var(--primary-dim)",
          color: "var(--primary)",
        }}
      >
        日本語
      </span>

      <div className="flex gap-1 ml-4">
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

      <div className="ml-auto flex items-center gap-3">
        <span className="text-sm" style={{ color: "var(--gold)" }}>
          🔥 {USER_STATS.streak}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          R
        </div>
      </div>
    </nav>
  );
}
