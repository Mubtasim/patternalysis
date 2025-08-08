"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPrevNextBySlug } from "@/lib/patterns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PatternLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Expect path like /patterns/<slug>
  const slug = pathname?.split("/")[2] || "";
  const { prev, next } = getPrevNextBySlug(slug);

  return (
    <main className="p-6 max-w-4xl mx-auto bg-background text-foreground">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-primary hover:text-primary/80 hover:underline transition-colors mb-4"
      >
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-foreground">{title} Pattern</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="sm:flex-1">
            {prev ? (
              <Link
                href={`/patterns/${prev.slug}`}
                aria-label={`Previous: ${prev.title}`}
                className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-700 text-white hover:bg-zinc-600 px-4 py-2 text-sm w-full sm:w-auto min-w-0"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Previous:</span>
                <span className="truncate">{prev.title}</span>
              </Link>
            ) : (
              <span className="text-sm text-muted-foreground">Beginning</span>
            )}
          </div>
          <div className="sm:flex-1 sm:text-right">
            {next ? (
              <Link
                href={`/patterns/${next.slug}`}
                aria-label={`Next: ${next.title}`}
                className="group inline-flex items-center gap-2 justify-end rounded-md border border-zinc-700 bg-zinc-700 text-white hover:bg-zinc-600 px-4 py-2 text-sm w-full sm:w-auto min-w-0"
              >
                <span className="truncate">{next.title}</span>
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            ) : (
              <span className="text-sm text-muted-foreground">End</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
