import Link from "next/link";
import { signOut } from "@/lib/auth-actions";

const navItems = [
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/artists", label: "Artists" },
  { href: "/admin/services", label: "Services" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">
            Ink Studio Admin
          </span>
          <nav className="flex items-center gap-6 text-sm text-text-secondary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-text"
              >
                {item.label}
              </Link>
            ))}
            <form action={signOut}>
              <button
                type="submit"
                className="transition-colors duration-200 hover:text-text"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
