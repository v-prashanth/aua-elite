import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { products as localProducts, type ProductHotspot } from "@/data/products";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Cache for 1 hour, auto-revalidated by server actions

interface ProductDetails {
  id: string;
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  requirements: string[];
  overview: string;
  bestSuited: string;
  showerUse?: string;
  benefits: string[];
  features: string[];
  applications: string[];
  specifications: Record<string, string>;
  techBlueprint?: ProductHotspot[];
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product: ProductDetails | null = null;

  try {
    const supabase = await createClient();
    const { data: dbProduct } = await supabase
      .from("products")
      .select("*")
      .or(`slug.eq.${params.slug},id.eq.${params.slug}`)
      .single();

    if (dbProduct) {
      product = {
        id: dbProduct.id,
        slug: dbProduct.slug,
        brand: dbProduct.brand_name || "",
        title: dbProduct.name,
        subtitle: dbProduct.subtitle || "",
        category: dbProduct.category,
        image: dbProduct.image || "",
        requirements: dbProduct.requirements || [],
        overview: dbProduct.description || "",
        bestSuited: dbProduct.best_suited || "",
        showerUse: dbProduct.shower_use || "",
        benefits: dbProduct.benefits || [],
        features: dbProduct.features || [],
        applications: dbProduct.applications || [],
        specifications: (dbProduct.specifications as Record<string, string>) || {},
      };
    }
  } catch (err) {
    console.warn("Failed to fetch product from Supabase. Falling back to local data.", err);
  }

  // Fallback to local data if not found in DB
  if (!product) {
    const local = localProducts.find(
      (p) => p.slug === params.slug || p.id === params.slug
    );
    if (local) {
      product = local;
    }
  }

  if (!product) {
    notFound();
  }

  const isGerman =
    product.specifications?.["Country of Origin"] === "Germany" ||
    product.overview?.toLowerCase().includes("germany") ||
    product.overview?.toLowerCase().includes("german");

  // Define the set of possible use cases and their applicability
  const allUseCases = [
    {
      name: "Kitchen",
      applies:
        product.requirements?.includes("Kitchen Use") ||
        product.showerUse === "Kitchen Sink" ||
        product.category === "water-filter",
      label: "Concealed under-sink kitchen tap & purity systems.",
    },
    {
      name: "Apartment",
      applies:
        product.category === "tankless-1ph" ||
        product.category === "water-filter" ||
        product.requirements?.includes("Small Bathroom"),
      label: "Optimized for single-phase electrical and compact spaces.",
    },
    {
      name: "Standard Shower",
      applies:
        product.requirements?.includes("Small Bathroom") ||
        product.showerUse === "Small Shower" ||
        product.showerUse === "Basic Hand Shower",
      label: "Provides stable hot water for hand showers and individual bathrooms.",
    },
    {
      name: "Rain Shower",
      applies:
        product.requirements?.includes("Rain Shower") ||
        product.requirements?.includes("Luxury Bathroom") ||
        product.showerUse?.includes("Rain Shower") ||
        product.showerUse?.includes("Body Jets"),
      label: "Sized for high-flow overhead rain domes and multi-outlet flow.",
    },
    {
      name: "Villa",
      applies:
        product.category === "heat-pump" ||
        product.category === "tankless-3ph" ||
        product.requirements?.includes("Large Family Home") ||
        product.requirements?.includes("Hotels & Commercial"),
      label: "Centralized loop or high-capacity system integration.",
    },
    {
      name: "Hotel",
      applies:
        product.requirements?.includes("Hotels & Commercial") ||
        product.category === "heat-pump" ||
        product.title?.includes("27"),
      label: "Sized for high-occupancy commercial and hospitality demands.",
    },
    {
      name: "Bathtub",
      applies:
        product.requirements?.includes("Bathtub") ||
        product.showerUse?.includes("Tubs") ||
        product.title?.includes("27"),
      label: "High-kilowatt rapid filling capacity for soaking tubs.",
    },
  ];

  const applicableUseCases = allUseCases.filter((u) => u.applies);

  const displayCategory = product.category?.startsWith("tankless")
    ? "Tankless Water Heater"
    : product.category === "heat-pump"
    ? "Centralized Heat Pump"
    : "Water Treatment Purifier";

  // Related products fallback or lookup
  let relatedProducts: ProductDetails[] = localProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  try {
    const supabase = await createClient();
    const { data: dbRelated } = await supabase
      .from("products")
      .select("id, slug, name, subtitle, brand_name, category, image")
      .eq("category", product.category)
      .neq("id", product.id)
      .eq("status", "available")
      .limit(3);

    if (dbRelated && dbRelated.length > 0) {
      relatedProducts = dbRelated.map(p => ({
        id: p.id,
        slug: p.slug,
        brand: p.brand_name || "",
        title: p.name,
        subtitle: p.subtitle || "",
        category: p.category,
        image: p.image || "",
        requirements: [],
        overview: "",
        bestSuited: "",
        showerUse: "",
        benefits: [],
        features: [],
        applications: [],
        specifications: {},
      }));
    }
  } catch {
    // Ignore related fetch error
  }

  return (
    <div className="relative min-h-screen bg-offwhite text-left font-sans pb-24 selection:bg-gold-primary/10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-purewhite border-b border-navy-primary/5 px-6 lg:px-12 py-4">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-[10px] font-sans">
          <Link href="/products" className="text-silver hover:text-navy-primary transition-colors duration-200">
            Products
          </Link>
          <ChevronRight size={10} className="text-silver/40" />
          <span className="text-navy-primary/60">{product.title}</span>
        </div>
      </nav>

      {/* ABOVE THE FOLD: Two-Column Layout */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-purewhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Large Product Image */}
            <div className="relative w-full h-[300px] sm:h-[420px] md:h-[460px] lg:h-[500px] rounded-2xl bg-gradient-to-b from-offwhite to-purewhite border border-navy-primary/5 overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,0,0,0.1)_95%)] bg-[size:100%_12px]" />
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-primary/5 text-navy-primary/20">
                  No Image Available
                </div>
              )}
            </div>

            {/* Right: Premium Information */}
            <div className="space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold border border-gold-primary/20 px-2 py-0.5 rounded bg-offwhite">
                  {product.brand} &bull; Sized & Verified
                </span>

                {isGerman && (
                  <span className="text-[8px] uppercase tracking-widest font-bold bg-navy-primary/5 text-navy-primary px-2 py-0.5 rounded">
                    Made in Germany
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-silver font-bold block">
                  {displayCategory}
                </span>
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-navy-primary leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-silver leading-relaxed font-sans font-medium text-balance">
                  {product.subtitle}
                </p>
              </div>

              <div className="space-y-4 text-xs text-silver font-sans leading-relaxed text-balance">
                <p>{product.overview}</p>
              </div>

              <div className="text-xs font-sans">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-1">
                  Suitable Application
                </span>
                <p className="text-navy-primary/85 leading-relaxed font-medium">
                  {product.bestSuited}
                </p>
              </div>

              {/* Sizing & Suitability Mini-Grid */}
              {applicableUseCases.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-navy-primary/5">
                  <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                    Sized & Verified For
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicableUseCases.map((item) => (
                      <div
                        key={item.name}
                        className="p-3.5 rounded-xl border border-navy-primary/5 bg-[#F2F3F5]/30 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-[9px] font-sans font-bold uppercase tracking-wider text-navy-primary">
                            {item.name}
                          </h4>
                          <Check size={11} className="text-gold-primary" />
                        </div>
                        <p className="text-[9px] font-sans text-silver leading-snug">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href={`/consultation?interest=${product.slug}`} className="flex-grow">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center text-xs font-bold uppercase tracking-wider px-5 py-3.5 bg-navy-primary text-purewhite hover:bg-gold-primary hover:text-navy-brand rounded-full border-transparent"
                  >
                    Book Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>

                <Link href={`/consultation?interest=${product.slug}&action=enquiry`} className="flex-grow">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center text-xs font-bold uppercase tracking-wider px-5 py-3.5 border-navy-primary/15 text-navy-primary hover:border-navy-primary rounded-full bg-purewhite"
                  >
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CUSTOMERS CHOOSE THIS */}
      {product.benefits?.length > 0 && (
        <section className="py-20 bg-purewhite border-b border-navy-primary/5" id="benefits">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <Reveal>
              <div className="mb-16 space-y-3 text-left">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                  Performance highlights
                </span>
                <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                  Why Customers Choose This
                </h2>
              </div>
            </Reveal>

            <div className="space-y-12 text-left">
              {product.benefits.slice(0, 4).map((benefit: string, idx: number) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex gap-6 items-start">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-primary/10 text-gold-primary font-display text-xs font-bold shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-navy-primary leading-relaxed font-sans">
                        {benefit}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KEY SPECIFICATIONS */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="py-20 bg-offwhite border-b border-navy-primary/5" id="specifications">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <Reveal>
              <div className="mb-12 space-y-3 text-left">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                  Technical Specifications
                </span>
                <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                  Key Specifications
                </h2>
                <p className="text-[11px] sm:text-xs text-silver">
                  Essential engineering parameters required for safe integration with your Hyderabad property.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="border border-navy-primary/5 rounded-xl overflow-hidden bg-purewhite shadow-resting">
                <table className="w-full text-left font-sans text-[11px] border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={cn(
                          "border-b border-navy-primary/5 last:border-0",
                          idx % 2 === 0 ? "bg-offwhite/50" : "bg-purewhite"
                        )}
                      >
                        <td className="px-6 py-4 font-bold text-navy-primary w-1/3 border-r border-navy-primary/5 uppercase text-[9px] tracking-wider">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-silver font-medium">{String(val)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-offwhite border-b border-navy-primary/5" id="related-products">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <Reveal>
              <div className="mb-12">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-2">
                  Also Consider
                </span>
                <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                  Related Products
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related, idx) => (
                <Reveal key={related.id} delay={idx * 0.1}>
                  <Link
                    href={`/products/${related.slug}`}
                    className="group flex flex-col h-full bg-purewhite border border-navy-primary/5 rounded-xl overflow-hidden hover:border-gold-primary/25 hover:shadow-raised transition-all duration-300"
                  >
                    <div className="relative w-full h-[200px] bg-offwhite overflow-hidden">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-navy-primary/5 text-navy-primary/20">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-1">
                        {related.brand}
                      </span>
                      <h3 className="font-display text-sm font-semibold text-navy-primary mb-2">
                        {related.title}
                      </h3>
                      <p className="text-[11px] text-silver font-sans leading-relaxed flex-grow">
                        {related.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-primary group-hover:text-navy-primary transition-colors mt-4">
                        View Details
                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEED HELP CHOOSING? */}
      <section className="py-20 bg-navy-dark text-white border-t border-gold-primary/20" id="consult-cta">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <div className="space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug">
                Not sure which system is right for you?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans max-w-md mx-auto text-balance">
                Book a free site visit. Our installation specialists will assess your property and recommend the right
                solution — before you spend anything.
              </p>
              <div className="pt-4">
                <Link href="/consultation">
                  <Button
                    variant="primary"
                    size="lg"
                    className="text-xs font-bold uppercase tracking-wider px-8 py-3.5 bg-gold-primary text-navy-brand hover:bg-gold-primary/95 border-transparent rounded-full"
                  >
                    Book Free Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
