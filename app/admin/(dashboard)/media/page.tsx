import type { Metadata } from 'next'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { Package, Award, Heart, Globe } from 'lucide-react'

export const metadata: Metadata = { title: 'Media Library' }

export default function MediaPage() {
  return (
    <div className="space-y-6 max-w-[1100px]">
      <div>
        <h2 className="text-[20px] font-sans font-semibold text-navy-primary">Media Library</h2>
        <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
          All images are stored in Supabase Storage. Use the bucket links below to manage files.
        </p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
        <p className="text-[12px] font-sans font-semibold text-blue-700 mb-1">
          How to upload images
        </p>
        <ol className="text-[12px] font-sans text-blue-600 space-y-1 list-decimal list-inside">
          <li>Go to your Supabase Dashboard → Storage</li>
          <li>Open the relevant bucket (products, gallery, brands, or media)</li>
          <li>Upload your image file</li>
          <li>Copy the public URL and paste it into the appropriate field in this admin panel</li>
        </ol>
      </div>

      {/* Bucket cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, name: 'products', desc: 'Product images. Used in product listings and detail pages.', color: 'bg-amber-50 text-amber-600' },
          { icon: Heart, name: 'gallery', desc: 'Happy customer installation photos. Used in the gallery.', color: 'bg-red-50 text-red-500' },
          { icon: Award, name: 'brands', desc: 'Brand logos. Used on the homepage and products page.', color: 'bg-emerald-50 text-emerald-600' },
          { icon: Globe, name: 'media', desc: 'General media: hero backgrounds, OG images, and favicons.', color: 'bg-blue-50 text-blue-600' },
        ].map(bucket => (
          <AdminCard key={bucket.name} className="hover:shadow-raised transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bucket.color}`}>
              <bucket.icon size={18} strokeWidth={1.75} />
            </div>
            <p className="text-[13px] font-sans font-semibold text-navy-primary mb-1 capitalize">
              {bucket.name}/
            </p>
            <p className="text-[11px] font-sans text-navy-primary/40 leading-relaxed mb-4">
              {bucket.desc}
            </p>
            <a
              href={`${process.env.NEXT_PUBLIC_SUPABASE_URL ?? '#'}/storage/v1/object/public/${bucket.name}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-sans font-semibold text-navy-primary/40 hover:text-gold-primary transition-colors"
            >
              Open in Supabase →
            </a>
          </AdminCard>
        ))}
      </div>

      {/* Quick paste helper */}
      <AdminCard>
        <h3 className="text-[14px] font-sans font-semibold text-navy-primary mb-2">
          Public URL Format
        </h3>
        <p className="text-[12px] font-sans text-navy-primary/50 mb-3">
          After uploading a file to a bucket, the public URL follows this format:
        </p>
        <div className="bg-navy-primary/4 rounded-xl px-4 py-3">
          <code className="text-[12px] font-mono text-navy-primary/70 break-all">
            {process.env.NEXT_PUBLIC_SUPABASE_URL
              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/[bucket]/[filename]`
              : 'https://[your-project-id].supabase.co/storage/v1/object/public/[bucket]/[filename]'
            }
          </code>
        </div>
      </AdminCard>
    </div>
  )
}
