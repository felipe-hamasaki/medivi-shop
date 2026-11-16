"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { categories, type Product, findRecord } from "@/lib/catalog";
import { useDemo } from "./demo-provider";
import { useI18n } from "./locale-provider";

export function ProductCard({
  product,
  simple = false,
}: {
  product: Product;
  simple?: boolean;
}) {
  const { language, tr, formatMoney, copy } = useI18n();
  const { state, hydrated, toggleWishlist } = useDemo();
  const name = findRecord(product.slug)?.[language].name ?? tr(product.name);
  const category = categories.find((item) => item.slug === product.category);
  const saved = state.wishlist.includes(product.slug);
  return (
    <article className="ware-card">
      <Link href={`/product/${product.slug}`} aria-label={name}>
        <div className="card-photo">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 700px) 50vw, (max-width: 1000px) 32vw, 25vw"
          />
        </div>
        <div className="ware-body">
          {category && <p className="card-category">{tr(category.name)}</p>}
          <h3>{name}</h3>
          <div className="ware-bottom">
            <span>{formatMoney(product.priceCents)}</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
      {!simple && (
        <button
          className="card-favorite"
          aria-pressed={saved}
          disabled={!hydrated}
          aria-label={`${saved ? copy.stopWatching : copy.watch} · ${name}`}
          onClick={() => toggleWishlist(product.slug)}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      )}
    </article>
  );
}
