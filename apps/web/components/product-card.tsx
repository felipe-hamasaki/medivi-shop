import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@medivi/ui/components/ui/badge";
import type { ProductListItem } from "@medivi/db/queries";
import { LocalizedText } from "./localized-text";
import { WishlistButton } from "./wishlist-button";
import { formatPriceCents } from "@/lib/format";

export function ProductCard({
  product,
  isWishlisted,
  showWishlistButton = false,
}: {
  product: ProductListItem;
  isWishlisted?: boolean;
  showWishlistButton?: boolean;
}) {
  return (
    <article className="store-product-card">
      <Link href={`/product/${product.slug}`}>
        <div className="store-card-photo">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              <LocalizedText text="Out of stock" />
            </Badge>
          )}
        </div>
        {product.material && (
          <p className="store-kicker">
            <LocalizedText text={product.material} />
          </p>
        )}
        <h3>
          <LocalizedText text={product.name} />
        </h3>
        <div className="store-card-price">
          {formatPriceCents(product.basePriceCents)}{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </div>
      </Link>
      {showWishlistButton && (
        <div className="store-card-favourite">
          <WishlistButton
            productId={product.id}
            initialWishlisted={!!isWishlisted}
          />
        </div>
      )}
    </article>
  );
}
