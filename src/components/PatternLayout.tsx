"use client";
import Link from "next/link";

export default function PatternLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
    </main>
  );
}
