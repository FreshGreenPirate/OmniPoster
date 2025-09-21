"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const demoBrands = [
  {
    id: "funfact",
    name: "Fun Fact Guy",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    color: "#7C3AED",
  },
  {
    id: "darktales",
    name: "Dark Tales",
    avatarUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    color: "#F97316",
  },
];

export function BrandSwitcher() {
  const [active, setActive] = useState(demoBrands[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-left text-sm text-slate-200 shadow"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: active.color }}
        >
          <img src={active.avatarUrl} alt={active.name} className="h-8 w-8 rounded-full object-cover" />
        </span>
        <div>
          <p className="font-semibold">{active.name}</p>
          <p className="text-xs text-slate-400">Workspace</p>
        </div>
        <ChevronDown className={clsx("h-4 w-4 transition", isOpen && "rotate-180")}
        />
      </button>

      {isOpen ? (
        <ul className="absolute right-0 z-10 mt-2 w-56 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
          {demoBrands.map((brand) => (
            <li key={brand.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-800"
                onClick={() => {
                  setActive(brand);
                  setIsOpen(false);
                }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: brand.color }}
                >
                  <img
                    src={brand.avatarUrl}
                    alt={brand.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </span>
                <div>
                  <p className="font-semibold">{brand.name}</p>
                  <p className="text-xs text-slate-400">Switch</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
