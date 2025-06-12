import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
  title: "basecn",
  description: "A Next.js with shadcn/ui project base to build mordern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NuqsAdapter>
            {children}
            <Toaster position="top-center" richColors />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
