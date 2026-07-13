import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KILN — A5 Wagyu. Twelve Seats.",
  description:
    "KILN. Forty-five days for four minutes. A5 wagyu, aged and seared. Twelve seats, one seating nightly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-char text-bone antialiased">{children}</body>
    </html>
  );
}
