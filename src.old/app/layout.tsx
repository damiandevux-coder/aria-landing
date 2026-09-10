import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aria — Your Company's First AI Employee",
  description: "Aria joins your Slack, learns your business, and starts delivering work in minutes. Not a tool. A hire.",
  openGraph: {
    title: "Aria — Your Company's First AI Employee",
    description: "Aria joins your Slack, learns your business, and starts delivering work in minutes.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aria — Your Company's First AI Employee",
    description: "Aria joins your Slack, learns your business, and starts delivering work in minutes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-[#10151f] text-[#e8edf4]">{children}</body>
    </html>
  );
}
