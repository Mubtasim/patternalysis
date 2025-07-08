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
    <main className="p-6 max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-4">{title} Pattern</h1>
      {children}
    </main>
  );
}
