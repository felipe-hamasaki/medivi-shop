import Link from "next/link";
import {
  Flag,
  FlaskRound,
  Gem,
  Layers,
  Shield,
  Shirt,
  Swords,
  VenetianMask,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CategoryNavNode } from "@medivi/db/queries";
import { LocalizedText } from "./localized-text";
import { getLocale } from "@/lib/i18n";

const icons: Record<string, LucideIcon | undefined> = {
  armor: VenetianMask,
  banners: Flag,
  cloaks: Shirt,
  potions: FlaskRound,
  relics: Gem,
  shields: Shield,
  swords: Swords,
};

export async function FeaturedCategories({
  categories,
}: {
  categories: CategoryNavNode[];
}) {
  if (!categories.length) return null;
  const locale = await getLocale();
  return (
    <nav
      className="store-collections"
      id="collections"
      aria-label={locale === "pt-BR" ? "Coleções" : "Collections"}
    >
      <div className="armory-shell">
        {categories.map((category) => {
          const Icon = icons[category.slug] ?? Layers;
          return (
            <Link key={category.id} href={`/catalog/${category.slug}`}>
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <LocalizedText text={category.name} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
