import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CollectionHero } from "@medivi/ui/components/collection-hero";

import { db } from "@medivi/db/client";
import {
  getWishlistedProductIds,
  listActiveBanners,
  listCategoryTree,
  listProducts,
} from "@medivi/db/queries";
import { getSession } from "@/lib/auth-guards";
import { HeroCarousel } from "@/components/hero-carousel";
import { FeaturedCategories } from "@/components/featured-categories";
import { PromoSections } from "@/components/promo-sections";
import { ProductCard } from "@/components/product-card";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Medivi Shop — Gear for Adventurers",
  description:
    "Swords, armor, cloaks, relics, and potions for adventurers of every guild.",
};

export default async function Home() {
  const locale = await getLocale();
  const pt = locale === "pt-BR";
  const [heroBanners, promoBanners, categories, featured, session] =
    await Promise.all([
      listActiveBanners(db, "hero"),
      listActiveBanners(db, "category"),
      listCategoryTree(db),
      listProducts(db, { sort: "featured", pageSize: 8 }),
      getSession(),
    ]);
  const wishlistedIds = session
    ? await getWishlistedProductIds(db, session.user.id)
    : null;

  return (
    <>
      <CollectionHero
        portuguese={pt}
        image={
          <Image
            src="/editorial/armour-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        }
        action={
          <Link className="forged hero-cta" href="/catalog">
            {pt ? "Explorar catálogo" : "Explore the catalogue"}
            <ArrowRight size={17} />
          </Link>
        }
      />
      <FeaturedCategories categories={categories} />

      <section
        className="armory-shell store-selection"
        aria-labelledby="featured-products-heading"
      >
        <div className="store-section-head">
          <div>
            <p className="store-kicker">
              ✦　{pt ? "Curadoria da casa" : "House curation"}
            </p>
            <h2 id="featured-products-heading">
              {pt ? "Seleção do mercador" : "The merchant’s selection"}
            </h2>
          </div>
          <Link className="store-section-link" href="/catalog">
            {pt ? "Ver todas as peças" : "View all pieces"}{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showWishlistButton={!!wishlistedIds}
              isWishlisted={wishlistedIds?.has(product.id)}
            />
          ))}
        </div>
      </section>

      {(heroBanners.length > 0 || promoBanners.length > 0) && (
        <div className="armory-shell store-campaigns">
          <HeroCarousel banners={heroBanners} />
          <PromoSections banners={promoBanners} />
        </div>
      )}
    </>
  );
}
