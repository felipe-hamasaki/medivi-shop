"use client";
import { useId, useState, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useLocale } from "./locale-provider";

export function CatalogControls({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const { locale } = useLocale();
  return (
    <aside className="store-catalog-controls">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal size={16} />{" "}
        {locale === "pt-BR" ? "Categorias e filtros" : "Categories and filters"}
      </button>
      <div id={id} data-open={open}>
        {children}
      </div>
    </aside>
  );
}
