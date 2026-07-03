export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type RawDatabase = {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          name: string
          slug: string | null
          description: string | null
          logo: string | null
          website: string | null
          origin: string | null
          note: string | null
          display_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          description?: string | null
          logo?: string | null
          website?: string | null
          origin?: string | null
          note?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          description?: string | null
          logo?: string | null
          website?: string | null
          origin?: string | null
          note?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          subtitle: string | null
          brand_id: string | null
          brand_name: string | null
          category: string
          description: string | null
          best_suited: string | null
          benefits: string[]
          features: string[]
          applications: string[]
          requirements: string[]
          specifications: Json
          power_type: string | null
          shower_use: string | null
          status: string
          featured: boolean
          display_order: number
          image: string | null
          gallery_images: string[]
          hero_color: string | null
          gallery_colors: string[]
          related_slugs: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          subtitle?: string | null
          brand_id?: string | null
          brand_name?: string | null
          category: string
          description?: string | null
          best_suited?: string | null
          benefits?: string[]
          features?: string[]
          applications?: string[]
          requirements?: string[]
          specifications?: Json
          power_type?: string | null
          shower_use?: string | null
          status?: string
          featured?: boolean
          display_order?: number
          image?: string | null
          gallery_images?: string[]
          hero_color?: string | null
          gallery_colors?: string[]
          related_slugs?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          subtitle?: string | null
          brand_id?: string | null
          brand_name?: string | null
          category?: string
          description?: string | null
          best_suited?: string | null
          benefits?: string[]
          features?: string[]
          applications?: string[]
          requirements?: string[]
          specifications?: Json
          power_type?: string | null
          shower_use?: string | null
          status?: string
          featured?: boolean
          display_order?: number
          image?: string | null
          gallery_images?: string[]
          hero_color?: string | null
          gallery_colors?: string[]
          related_slugs?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          display_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          image: string
          caption: string | null
          category: string | null
          display_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image: string
          caption?: string | null
          category?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image?: string
          caption?: string | null
          category?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          message: string | null
          property_type: string | null
          bathrooms: string | null
          interested_product: string | null
          preferred_date: string | null
          source: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          message?: string | null
          property_type?: string | null
          bathrooms?: string | null
          interested_product?: string | null
          preferred_date?: string | null
          source?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          message?: string | null
          property_type?: string | null
          bathrooms?: string | null
          interested_product?: string | null
          preferred_date?: string | null
          source?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hero_content: {
        Row: {
          id: string
          heading: string
          subheading: string | null
          tagline: string | null
          cta_text: string | null
          cta_link: string | null
          bg_image: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          heading: string
          subheading?: string | null
          tagline?: string | null
          cta_text?: string | null
          cta_link?: string | null
          bg_image?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          heading?: string
          subheading?: string | null
          tagline?: string | null
          cta_text?: string | null
          cta_link?: string | null
          bg_image?: string | null
          updated_at?: string
        }
      }
      seo_settings: {
        Row: {
          id: string
          page_path: string
          title: string | null
          description: string | null
          og_image: string | null
          keywords: string[]
          robots: string | null
          canonical: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          page_path: string
          title?: string | null
          description?: string | null
          og_image?: string | null
          keywords?: string[]
          robots?: string | null
          canonical?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          title?: string | null
          description?: string | null
          og_image?: string | null
          keywords?: string[]
          robots?: string | null
          canonical?: string | null
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string | null
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type FixDatabase<T> = {
  [K in keyof T]: T[K] extends { Tables: infer Tables }
    ? Omit<T[K], 'Tables'> & {
        Tables: {
          [TB in keyof Tables]: Tables[TB] & { Relationships: [] }
        }
      }
    : T[K]
}

export type Database = FixDatabase<RawDatabase>

export type Brand = Database['public']['Tables']['brands']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type FAQ = Database['public']['Tables']['faqs']['Row']
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type HeroContent = Database['public']['Tables']['hero_content']['Row']
export type SeoSetting = Database['public']['Tables']['seo_settings']['Row']
export type ContactInfo = Database['public']['Tables']['contact_info']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']

export type LeadStatus = 'new' | 'contacted' | 'inspection_scheduled' | 'quotation_sent' | 'completed' | 'closed'
export type ProductStatus = 'available' | 'coming-soon'
export type GalleryCategory = 'residential' | 'commercial' | 'villa' | 'apartment' | 'hotel' | 'office'
