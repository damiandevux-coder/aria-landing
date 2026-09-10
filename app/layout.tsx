import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aria. Your first AI employee, already in Slack.",
  description:
    "Aria joins your Slack as a named team member. She reads your channels, does the research, writes the code, and delivers the file in the thread.",
  openGraph: {
    title: "Aria. Your first AI employee, already in Slack.",
    description:
      "Aria reads your channels, does the research, writes the code, and delivers the file. In the thread.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
