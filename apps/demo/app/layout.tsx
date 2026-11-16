import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@medivi/ui/components/theme-provider";
import { Toaster } from "@medivi/ui/components/ui/sonner";
import { DemoProvider } from "@/components/demo-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocaleProvider } from "@/components/locale-provider";
import { siteUrl } from "@/lib/site";
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

const title = "Medivi · Acervo medieval";
const description =
  "Explore a coleção de armaduras, lâminas e relíquias da Medivi, uma loja de fantasia com checkout simulado.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Medivi" },
  description,
  openGraph: {
    type: "website",
    siteName: "Medivi",
    title,
    description,
    images: ["/editorial/armour-hero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/editorial/armour-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`dark ${display.variable} ${sans.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          enableSystem={false}
        >
          <LocaleProvider locale="pt-BR">
            <DemoProvider>
              <SiteHeader />
              <main id="main-content" tabIndex={-1} className="flex-1">
                {children}
              </main>
              <SiteFooter />
              <Toaster />
            </DemoProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
