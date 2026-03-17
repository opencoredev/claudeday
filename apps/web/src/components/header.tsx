import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b border-foreground/10 bg-background/70 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="text-sm font-semibold tracking-[0.24em] uppercase">
          National Claude Day
        </Link>
        <p className="text-right text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          resets every march 14 at 12:00 am local time
        </p>
      </div>
    </header>
  );
}
