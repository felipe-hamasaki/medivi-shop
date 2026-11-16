import Image from "next/image";
import {
  Anvil,
  BadgeCheck,
  Coins,
  Feather,
  Flame,
  FlaskRound,
  Gem,
  LayoutGrid,
  ScrollText,
  Shield,
  Shirt,
  Sword,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const marks: Record<string, LucideIcon | undefined> = {
  anvil: Anvil,
  seal: BadgeCheck,
  coins: Coins,
  feather: Feather,
  flame: Flame,
  potion: FlaskRound,
  rune: Gem,
  knot: LayoutGrid,
  scroll: ScrollText,
  shield: Shield,
  cloak: Shirt,
  broadsword: Sword,
  swords: Swords,
};

export function Mark({
  name,
  tone = "bronze",
  size = 20,
}: {
  name: string;
  tone?: "bone" | "bronze" | "ink";
  size?: number;
}) {
  const Icon = marks[name] ?? Gem;
  return (
    <Icon
      className="armory-mark"
      data-tone={tone}
      size={size}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
export function ProductFrame({
  src,
  alt,
  variant = "card",
  children,
  priority = false,
}: {
  src: string;
  alt: string;
  variant?: "card" | "hero" | "detail" | "small";
  children?: ReactNode;
  priority?: boolean;
}) {
  return (
    <div className={`product-frame product-frame--${variant}`}>
      <div className="product-photo">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={
            variant === "small"
              ? "70px"
              : "(min-width:1200px) 580px, (min-width:900px) 50vw, 100vw"
          }
        />
      </div>
      {children}
    </div>
  );
}
export function Heading({
  title,
  subtitle,
  eyebrow,
  mark,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  mark?: string;
}) {
  return (
    <div className="page-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className="heading-rule">
        {mark && <Mark name={mark} size={28} />}
        <h1>{title}</h1>
        <span className="rule" />
      </div>
      {subtitle && <p className="lede">{subtitle}</p>}
    </div>
  );
}
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="heading-rule">
      <h2>{children}</h2>
      <span className="rule" data-reveal="rule" />
      <Mark name="knot" size={22} />
    </div>
  );
}
