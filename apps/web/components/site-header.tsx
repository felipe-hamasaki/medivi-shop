import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { HouseMark } from "@medivi/ui/components/house-mark";
import { ThemeToggle } from "@medivi/ui/components/theme-toggle";
import { listCategoryTree } from "@medivi/db/queries";
import { db } from "@medivi/db/client";
import { getSession } from "@/lib/auth-guards";
import { getCurrentCartDetail } from "@/lib/cart";
import { UserMenu } from "./user-menu";
import { CartDrawer } from "./cart-drawer";
import { getLocale, getTranslations } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteHeader() {
  const locale = await getLocale();
  const pt = locale === "pt-BR";
  const t = getTranslations(locale);
  const [session, categories, cart] = await Promise.all([
    getSession(),
    listCategoryTree(db),
    getCurrentCartDetail(),
  ]);
  return (
    <header className="store-header">
      <a className="store-skip" href="#main-content">
        {pt ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <div className="armory-shell store-header-row">
        <Link href="/" className="wordmark" aria-label={t("header.home")}>
          <HouseMark />
        </Link>
        <nav
          className="store-nav"
          aria-label={pt ? "Navegação principal" : "Main navigation"}
        >
          <Link href="/">{pt ? "Início" : "Home"}</Link>
          <Link href="/catalog">{t("footer.catalog")}</Link>
          {categories.length > 0 && (
            <Link href="/#collections">{pt ? "Coleções" : "Collections"}</Link>
          )}
          {!session && <Link className="store-signup" href="/sign-up">{t("header.signUp")}</Link>}
        </nav>
        <div className="store-tools">
          <LanguageSwitcher locale={locale} label={t("language.label")} />
          <ThemeToggle />
          <Link href="/search#shop-query" className="store-search" aria-label={t("footer.search")}><SearchIcon size={18} /></Link>
          <CartDrawer cart={cart} />
          {session ? (
            <UserMenu
              name={session.user.name}
              isAdmin={session.user.role === "admin"}
            />
          ) : (
            <Link href="/sign-in" className="store-auth-link">
              {t("header.signIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
