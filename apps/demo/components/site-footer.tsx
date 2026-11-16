"use client";
import Link from "next/link";
import { useI18n } from "./locale-provider";
import { Wordmark } from "./site-header";

export function SiteFooter() {
  const { language, copy } = useI18n();
  const pt = language === "pt";
  return (
    <footer className="site-footer">
      <div className="armory-shell footer-row">
        <Wordmark />
        <nav aria-label={pt ? "Rodapé" : "Footer"}>
          <Link href="/catalog">{pt ? "Catálogo" : "Catalogue"}</Link>
          <Link href="/wishlist">{pt ? "Favoritos" : "Wishlist"}</Link>
          <Link href="/admin">{copy.adminTitle}</Link>
        </nav>
      </div>
      <div className="armory-shell footer-credit">
        <span>
          {pt
            ? "Loja de demonstração · Compras simuladas"
            : "Demo shop · Simulated purchases"}
        </span>
        <a href="/mk/ICONS-LICENSE.txt">
          {pt ? "Créditos dos ícones" : "Icon credits"}
        </a>
      </div>
    </footer>
  );
}
