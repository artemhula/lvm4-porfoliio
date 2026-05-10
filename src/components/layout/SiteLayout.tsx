import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";

const navItems = [
  { to: "/", label: "Головна" },
  { to: "/projects", label: "Проєкти" },
  { to: "/contacts", label: "Контакти" },
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-mono font-bold text-secondary">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary">
              <Code2 className="h-4 w-4" />
            </span>
            ArtemHulaDev
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
                activeProps={{ className: "text-secondary border-b-2 border-primary" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ArtemHulaDev. Усі права захищені.
          </p>
          <p className="text-sm text-muted-foreground">
            Створено з <span className="text-primary">♥</span> в Україні
          </p>
        </div>
      </footer>
    </div>
  );
}