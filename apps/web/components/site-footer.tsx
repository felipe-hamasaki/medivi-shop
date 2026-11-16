import Link from "next/link";
import { HouseMark } from "@medivi/ui/components/house-mark";

import { NewsletterForm } from "./newsletter-form";
import { getLocale, getTranslations } from "@/lib/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  return (
    <footer className="store-footer">
      <div className="armory-shell grid gap-8 py-10 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Link href="/" className="wordmark" aria-label={t("header.home")}>
            <HouseMark />
          </Link>
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <nav aria-label={locale === "pt-BR" ? "Rodapé" : "Footer"} className="flex flex-col gap-2 text-sm">
          <Link href="/catalog" className="text-muted-foreground hover:text-foreground">
            {t("footer.catalog")}
          </Link>
          <Link href="/search" className="text-muted-foreground hover:text-foreground">
            {t("footer.search")}
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
            {t("footer.privacy")}
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground">
            {t("footer.terms")}
          </Link>
          <Link href="/shipping-returns" className="text-muted-foreground hover:text-foreground">
            {t("footer.shipping")}
          </Link>
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t("footer.newsletter")}</span>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Medivi Shop. {t("footer.disclaimer")}
      </div>
    </footer>
  );
}
