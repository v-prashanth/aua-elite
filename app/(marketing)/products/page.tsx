import * as React from "react";
import { products as localProducts } from "@/data/products";
import { ProductsClient, UiProduct } from "@/components/products/ProductsClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Cache for 1 hour, auto-revalidated by server actions

const DEFAULT_BRANDS = [
  {
    name: "Stiebel Eltron",
    origin: "Germany · Est. 1924",
    note: "Global leader in tankless heating and air-source heat pumps.",
  },
  {
    name: "A.O. Smith",
    origin: "USA · Est. 1874",
    note: "Pioneer in glass-lined storage geysers and safety engineering.",
  },
  {
    name: "ZeroB",
    origin: "India · Est. 1985",
    note: "Residential water softeners and advanced filtration systems.",
  },
  {
    name: "Zanskar",
    origin: "India · Est. 2020",
    note: "Smart, centralised eco-friendly thermal loop integrations.",
  },
];

export default async function ProductsPage() {
  let displayProducts: UiProduct[] = localProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    image: p.image,
    requirements: p.requirements,
  }));

  let displayBrands = DEFAULT_BRANDS;

  try {
    const supabase = await createClient();
    
    // Fetch products
    const { data: dbProducts, error: prodError } = await supabase
      .from("products")
      .select("id, slug, name, subtitle, brand_name, category, image, requirements, status")
      .eq("status", "available")
      .order("display_order", { ascending: true });

    if (!prodError && dbProducts && dbProducts.length > 0) {
      displayProducts = dbProducts.map(p => ({
        id: p.id,
        slug: p.slug,
        brand: p.brand_name || "",
        title: p.name,
        subtitle: p.subtitle || "",
        category: p.category,
        image: p.image || "",
        requirements: p.requirements || [],
      }));
    }

    // Fetch brands
    const { data: dbBrands, error: brandError } = await supabase
      .from("brands")
      .select("name, origin, note")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (!brandError && dbBrands && dbBrands.length > 0) {
      // DB is the source of truth — all defaults were seeded via seed_brands.js
      displayBrands = dbBrands.map(b => ({
        name: b.name,
        origin: b.origin || "",
        note: b.note || "",
      }));
    }
    // If DB returns empty, displayBrands stays as DEFAULT_BRANDS (safety fallback)
  } catch (err) {
    console.warn("Failed to fetch products or brands from Supabase. Falling back to local data.", err);
  }

  return (
    <ProductsClient
      products={displayProducts}
      brands={displayBrands}
    />
  );
}
