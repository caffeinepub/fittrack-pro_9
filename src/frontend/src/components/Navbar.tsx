import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Exercises", href: "#exercises" },
  { label: "Workouts", href: "#workouts" },
  { label: "Tracking", href: "#tracking" },
  { label: "Progress", href: "#progress" },
  { label: "Profile", href: "#profile" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#dashboard"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-teal" />
            </div>
            <span className="font-bold text-lg text-foreground">
              <span className="text-navy font-extrabold">Fit</span>
              <span className="text-teal font-extrabold">Pulse</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-4"
              onClick={() =>
                document
                  .getElementById("tracking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="nav.primary_button"
            >
              Log Workout
            </Button>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarFallback className="bg-teal text-white text-xs font-bold">
                JD
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            className="mt-3 w-full bg-navy hover:bg-navy-dark text-white font-semibold"
            data-ocid="nav.primary_button"
          >
            Log Workout
          </Button>
        </div>
      )}
    </header>
  );
}
