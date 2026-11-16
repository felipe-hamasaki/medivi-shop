"use client";

import Link from "next/link";
import { FlaskRound, Gem, Shield, Shirt, Swords } from "lucide-react";
import { useI18n } from "./locale-provider";

const collections = [
  { slug: "armory", pt: "Lâminas", en: "Blades", icon: Swords },
  { slug: "bulwark", pt: "Armaduras", en: "Armour", icon: Shield },
  { slug: "relics", pt: "Relíquias", en: "Relics", icon: Gem },
  { slug: "wayfarer", pt: "Vestimentas", en: "Garments", icon: Shirt },
  { slug: "alchemist", pt: "Alquimia", en: "Alchemy", icon: FlaskRound },
] as const;

export function CollectionLinks() {
  const { language } = useI18n();
  return (
    <nav
      id="collections"
      className="collection-strip"
      aria-label={language === "pt" ? "Coleções" : "Collections"}
    >
      <div className="armory-shell collection-links">
        {collections.map(({ slug, icon: Icon, ...label }) => (
          <Link key={slug} href={`/catalog?department=${slug}`}>
            <Icon aria-hidden="true" />
            {label[language]}
          </Link>
        ))}
      </div>
    </nav>
  );
}
