import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_CONFIG } from "@/configs/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
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
  title: SITE_CONFIG.metadata.title,
  description: SITE_CONFIG.metadata.description,
  keywords: SITE_CONFIG.metadata.keywords,
  authors: [
    {
      name: SITE_CONFIG.metadata.author,
      url: SITE_CONFIG.metadata.author_url,
    },
  ],
  publisher: SITE_CONFIG.metadata.publisher,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
