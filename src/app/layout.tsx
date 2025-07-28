import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patternalysis",
  description: "Design Pattern Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center justify-between px-6">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-xl font-bold">Patternalysis</span>
                </Link>
                <ThemeToggle />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster 
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
              className: 'bg-card text-card-foreground border border-border',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
