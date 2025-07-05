import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const title = "o1";
const description = "axiom's product studio.";
const url = "https://o1.axiomclub.tech";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: ["axiom", "o1", "axiomclub.tech", "svgu", "ucpit"],
  authors: [{ name: "axiomclub.tech" }],
  creator: "axiomclub.tech",
  publisher: "axiomclub.tech",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
    creator: "@axiom",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
