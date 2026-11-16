import type { ReactNode } from "react";

export function CollectionHero({
  portuguese: pt,
  image,
  action,
}: {
  portuguese: boolean;
  image: ReactNode;
  action: ReactNode;
}) {
  return (
    <section className="editorial-hero">
      {image}
      <div className="armory-shell hero-content">
        <div className="hero-kicker">
          <span aria-hidden="true" />
          {pt ? "O acervo medieval" : "The medieval collection"}
        </div>
        <h1>
          {pt ? "Relíquias de" : "Relics of"}
          <em>{pt ? "outra era." : "another age."}</em>
        </h1>
        <p>
          {pt
            ? "Do aço à alquimia, descubra as peças que contam as histórias dos antigos reinos."
            : "From steel to alchemy, discover the pieces that tell the stories of kingdoms past."}
        </p>
        {action}
      </div>
    </section>
  );
}
