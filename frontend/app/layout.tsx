import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nudge | Habit reminders with receipts",
  description:
    "nudge sends Discord reminders for your habits, tracks completions, and gives you a clear history of what got done.",
  openGraph: {
    title: "nudge | Habit reminders with receipts",
    description:
      "Discord-first habit reminders with a clean completion history and lightweight architecture.",
    type: "website",
    siteName: "nudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "nudge | Habit reminders with receipts",
    description:
      "Discord-first habit reminders with a clean completion history and lightweight architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
