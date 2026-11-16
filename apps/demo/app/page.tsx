"use client";

import Link from "next/link";
import Image from "next/image";
import { CollectionHero } from "@medivi/ui/components/collection-hero";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { CollectionLinks } from "@/components/collection-links";
import { useI18n } from "@/components/locale-provider";
import { useDemo } from "@/components/demo-provider";
import { visibleProducts } from "@/lib/store";

const selection = [
  "silver-rapier",
  "steel-great-helm",
  "amulet-of-warding",
  "greater-healing-potion",
];

export default function Home() {
  const { language } = useI18n();
  const { state } = useDemo();
  const pt = language === "pt";
  const available = visibleProducts(state);
  const featured = [
    ...selection.flatMap((slug) =>
      available.filter((item) => item.slug === slug),
    ),
    ...available.filter((item) => !selection.includes(item.slug)),
  ].slice(0, 4);
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
      <CollectionLinks />
      <section
        className="armory-shell featured-section"
        aria-labelledby="featured-title"
      >
        <div className="section-head">
          <div>
            <p className="section-kicker">
              <span aria-hidden="true">✦</span>
              {pt ? "Curadoria da casa" : "House curation"}
            </p>
            <h2 id="featured-title">
              {pt ? "Seleção do mercador" : "The merchant’s selection"}
            </h2>
          </div>
          <Link className="section-link" href="/catalog">
            {pt ? "Ver todas as peças" : "View all pieces"}
            <ArrowRight size={16} />
          </Link>
        </div>
        {featured.length ? (
          <div className="wares-grid">
            {featured.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        ) : (
          <p>
            {pt
              ? "Nenhuma peça disponível no momento."
              : "No pieces available at the moment."}
          </p>
        )}
      </section>
    </>
  );
}
