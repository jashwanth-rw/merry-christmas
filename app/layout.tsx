import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merry Christmas!",
  description: "Here's to a season of fun, laughter, and good cheer! Enjoy the holidays and make magical memories with loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
