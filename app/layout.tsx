import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://jiya-portfolio-hr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jiya Yadav — HR Intern",
    template: "%s · Jiya Yadav",
  },
  description:
    "Jiya Yadav — first-year BA student and HR intern focused on recruitment tracking, screening, and interview coordination.",
  keywords: [
    "Jiya Yadav",
    "HR Intern",
    "Recruitment",
    "People Operations",
    "Candidate Screening",
    "Google Sheets",
  ],
  authors: [{ name: "Jiya Yadav" }],
  creator: "Jiya Yadav",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Jiya Yadav — HR Intern",
    description:
      "Recruitment tracking, screening, and interview coordination. Open to HR intern roles.",
    siteName: "Jiya Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiya Yadav — HR Intern",
    description:
      "Recruitment tracking, screening, and interview coordination.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
