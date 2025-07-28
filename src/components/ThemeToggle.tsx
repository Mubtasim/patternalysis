"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-border bg-background"></div>
    );
  }

  const toggleTheme = () => {
    // If currently on system mode or resolved to light, switch to dark
    // If currently on dark, switch to light
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    // Show the icon for what it will switch TO
    if (resolvedTheme === "light") {
      return <Moon className="h-4 w-4" />;
    } else {
      return <Sun className="h-4 w-4" />;
    }
  };

  const getTooltip = () => {
    if (resolvedTheme === "light") {
      return "Switch to dark mode";
    } else {
      return "Switch to light mode";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md w-9 h-9 border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
} 