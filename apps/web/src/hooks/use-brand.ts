"use client";

import { useState } from "react";
import type { Brand } from "@/types";

const initialBrand: Brand = {
  id: "funfact",
  name: "Fun Fact Guy",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  primaryColor: "#7C3AED",
  defaultTimezone: "America/New_York",
};

export function useBrand() {
  const [brand] = useState<Brand>(initialBrand);
  return brand;
}
