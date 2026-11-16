"use client";

import Link from "next/link";
import { HouseMark } from "@medivi/ui/components/house-mark";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useDemo } from "./demo-provider";
import { useI18n } from "./locale-provider";
import { LanguageSwitcher } from "./language-switcher";

export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      className="wordmark"
      aria-label="Medivi"
      onClick={onNavigate}
    >
      <HouseMark />
    </Link>
  );
}

export function SiteHeader() {
  const { copy, t, language } = useI18n();
  const { cartCount, state } = useDemo();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const pt = language === "pt";
  const links = [
    { href: "/", label: pt ? "Início" : "Home" },
    { href: "/catalog", label: pt ? "Catálogo" : "Catalogue" },
    { href: "/#collections", label: pt ? "Coleções" : "Collections" },
  ];
  const close = () => setOpen(false);
  const navigation = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={close}
      aria-current={pathname === link.href ? "page" : undefined}
    >
      {link.label}
    </Link>
  ));
  return (
    <>
      <a className="skip-link" href="#main-content">
        {pt ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            close();
            menuRef.current?.focus();
          }
        }}
      >
        <div className="armory-shell header-row">
          <Wordmark onNavigate={close} />
          <nav className="desktop-nav" aria-label={t("menu")}>
            {navigation}
          </nav>
          <div className="header-controls">
            <LanguageSwitcher />
            <Link
              className="icon-control search-control"
              onClick={close}
              aria-label={pt ? "Buscar no catálogo" : "Search the catalogue"}
              href="/catalog#search"
            >
              <Search />
            </Link>
            <Link
              className="icon-control"
              href="/wishlist"
              onClick={close}
              aria-label={`${copy.watchTitle}, ${state.wishlist.length}`}
            >
              <Heart />
              {state.wishlist.length > 0 && (
                <span className="count">{state.wishlist.length}</span>
              )}
            </Link>
            <Link
              className="icon-control"
              href="/cart"
              onClick={close}
              aria-label={`${t("cart")}, ${cartCount}`}
            >
              <ShoppingBag />
              {cartCount > 0 && <span className="count">{cartCount}</span>}
            </Link>
            <button
              ref={menuRef}
              className="icon-control menu-control"
              aria-label={t("menu")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label={t("menu")}
          >
            {navigation}
          </nav>
        )}
      </header>
    </>
  );
}
export function DemoNotice() {
  const { copy } = useI18n();
  return <p className="demo-line">{copy.demoLine}</p>;
}
