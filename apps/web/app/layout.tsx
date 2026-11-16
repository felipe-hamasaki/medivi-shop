import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@medivi/ui/components/theme-provider";
import { Toaster } from "@medivi/ui/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsBeacon } from "@/components/analytics-beacon";
import { JsonLd } from "@/components/json-ld";
import { env } from "@/lib/env";
import { getLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/locale-provider";
import "./globals.css";

const display = localFont({
  variable: "--font-display-face",
  src: [
    {
      path: "../../../packages/ui/src/fonts/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../../packages/ui/src/fonts/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
});
const sans = localFont({
  variable: "--font-interface",
  src: "../../../packages/ui/src/fonts/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Medivi Shop",
  description: "Gear for adventurers — swords, armor, relics, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`dark ${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Medivi Shop",
            url: env.NEXT_PUBLIC_APP_URL,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider locale={locale}>
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </LocaleProvider>
          <Toaster />
          <AnalyticsBeacon />
        </ThemeProvider>
      </body>
    </html>
  );
}
