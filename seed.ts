import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import { products } from './data/products'
import { faqs } from './data/faqs'
import { projects } from './data/projects'

// ─── Environment parsing ──────────────────────────────────────────────────────
function parseEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found. Make sure it exists in the project root.')
  }
  const content = fs.readFileSync(envPath, 'utf8')
  const env: Record<string, string> = {}
  
  content.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const idx = trimmed.indexOf('=')
    if (idx > 0) {
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim()
      env[key] = val
    }
  })
  
  return env
}

const env = parseEnv()
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or Service Role Key missing in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
})

// ─── Content-Type Helper ──────────────────────────────────────────────────────
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.gif') return 'image/gif'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg' // Default fallback
}

// ─── Main Seeding Routine ──────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting Supabase Database & Storage Seeding...')

  // 1. Ensure storage buckets exist
  console.log('\n📦 Checking Storage Buckets...')
  const { data: buckets, error: listBucketsErr } = await supabase.storage.listBuckets()
  if (listBucketsErr) {
    throw new Error(`Failed to list buckets: ${listBucketsErr.message}`)
  }
  
  const existingBucketIds = buckets?.map(b => b.id) || []
  const requiredBuckets = [
    { id: 'products', public: true, limit: 10485760 },
    { id: 'gallery', public: true, limit: 10485760 },
    { id: 'brands', public: true, limit: 2097152 }
  ]

  for (const bucket of requiredBuckets) {
    if (!existingBucketIds.includes(bucket.id)) {
      console.log(`- Creating bucket "${bucket.id}"...`)
      const { error: createErr } = await supabase.storage.createBucket(bucket.id, {
        public: bucket.public,
        fileSizeLimit: bucket.limit
      })
      if (createErr) {
        console.error(`❌ Failed to create bucket "${bucket.id}":`, createErr.message)
      }
    } else {
      console.log(`- Bucket "${bucket.id}" already exists.`)
    }
  }

  // 2. Upload assets and track public URLs
  const fileUrlMap: Record<string, string> = {}

  // A. Upload Brand Logos
  console.log('\n🏷️ Uploading Brand Logos...')
  const logosDir = path.join(process.cwd(), 'public', 'logos')
  if (fs.existsSync(logosDir)) {
    const files = fs.readdirSync(logosDir)
    for (const file of files) {
      if (file.startsWith('.')) continue
      const filePath = path.join(logosDir, file)
      const fileBuffer = fs.readFileSync(filePath)
      const mimeType = getMimeType(filePath)
      
      const storagePath = file
      console.log(`- Uploading brand logo: ${file}...`)
      
      const { error: uploadErr } = await supabase.storage
        .from('brands')
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        })

      if (uploadErr) {
        console.error(`❌ Failed to upload brand logo "${file}":`, uploadErr.message)
      } else {
        const { data } = supabase.storage.from('brands').getPublicUrl(storagePath)
        fileUrlMap[`/logos/${file}`] = data.publicUrl
      }
    }
  }

  // B. Upload Product Images
  console.log('\n🛍️ Uploading Product Images...')
  const productsDir = path.join(process.cwd(), 'public', 'images', 'products')
  if (fs.existsSync(productsDir)) {
    const files = fs.readdirSync(productsDir)
    for (const file of files) {
      if (file.startsWith('.')) continue
      const filePath = path.join(productsDir, file)
      const fileBuffer = fs.readFileSync(filePath)
      const mimeType = getMimeType(filePath)
      
      const storagePath = file
      console.log(`- Uploading product image: ${file}...`)
      
      const { error: uploadErr } = await supabase.storage
        .from('products')
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        })

      if (uploadErr) {
        console.error(`❌ Failed to upload product image "${file}":`, uploadErr.message)
      } else {
        const { data } = supabase.storage.from('products').getPublicUrl(storagePath)
        fileUrlMap[`/images/products/${file}`] = data.publicUrl
      }
    }
  }

  // C. Upload Gallery / Project Images
  console.log('\n🖼️ Uploading Gallery & Project Images...')
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'projects')
  if (fs.existsSync(galleryDir)) {
    const files = fs.readdirSync(galleryDir)
    for (const file of files) {
      if (file.startsWith('.')) continue
      const filePath = path.join(galleryDir, file)
      const fileBuffer = fs.readFileSync(filePath)
      const mimeType = getMimeType(filePath)
      
      const storagePath = file
      console.log(`- Uploading project image: ${file}...`)
      
      const { error: uploadErr } = await supabase.storage
        .from('gallery')
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        })

      if (uploadErr) {
        console.error(`❌ Failed to upload project image "${file}":`, uploadErr.message)
      } else {
        const { data } = supabase.storage.from('gallery').getPublicUrl(storagePath)
        fileUrlMap[`/images/projects/${file}`] = data.publicUrl
      }
    }
  }

  console.log('\n🧹 Clearing existing records to prevent duplication...')
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('gallery_images').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // 3. Seed Brands
  console.log('\n🌿 Seeding Brands...')
  const defaultBrands = [
    {
      name: 'Stiebel Eltron',
      slug: 'stiebel-eltron',
      logo: fileUrlMap['/logos/Stielbel-Eltron.png'] || '/logos/Stielbel-Eltron.png',
      origin: 'Germany · Est. 1924',
      note: 'Global leader in tankless heating and air-source heat pumps.',
      description: 'Stiebel Eltron is a German manufacturer of central water heaters and heat pumps, widely recognized for engineering innovation and exceptional durability.',
      display_order: 1,
      visible: true
    },
    {
      name: 'A.O. Smith',
      slug: 'ao-smith',
      logo: fileUrlMap['/logos/aosmith.png'] || '/logos/aosmith.png',
      origin: 'USA · Est. 1874',
      note: 'Pioneer in glass-lined storage geysers and safety engineering.',
      description: 'A.O. Smith is one of the world\'s leading manufacturers of residential and commercial water heaters, famous for their patented blue diamond glass lining.',
      display_order: 2,
      visible: true
    },
    {
      name: 'ZeroB',
      slug: 'zerob',
      logo: fileUrlMap['/logos/zeroB.jpg'] || '/logos/zeroB.jpg',
      origin: 'India · Est. 1985',
      note: 'Residential water softeners and advanced filtration systems.',
      description: 'ZeroB is Ion Exchange\'s flagship home brand, producing advanced eco-friendly water softeners and RO purifiers specifically tuned for Indian groundwater profiles.',
      display_order: 3,
      visible: true
    },
    {
      name: 'Zanskar',
      slug: 'zanskar',
      logo: fileUrlMap['/logos/Zanskar.png'] || '/logos/Zanskar.png',
      origin: 'India · Est. 2020',
      note: 'Smart, centralised eco-friendly thermal loop integrations.',
      description: 'Zanskar builds high-efficiency heat pumps and centralized smart heating loops optimized for large villas, saving up to 70% in energy compared to traditional heaters.',
      display_order: 4,
      visible: true
    }
  ]

  const { data: seededBrands, error: brandsErr } = await supabase
    .from('brands')
    .insert(defaultBrands)
    .select('id, name')

  if (brandsErr) {
    throw new Error(`Failed to seed brands: ${brandsErr.message}`)
  }
  console.log(`- Successfully seeded ${seededBrands?.length} brands.`)

  // Build brand name to brand ID mapping
  const brandNameToIdMap: Record<string, string> = {}
  seededBrands?.forEach(b => {
    brandNameToIdMap[b.name] = b.id
  })

  // 4. Seed Products
  console.log('\n💧 Seeding Products...')
  const dbProducts = products.map((prod, idx) => {
    // Map brand name to existing brand ID from insert
    const brandId = brandNameToIdMap[prod.brand] || null
    
    // Resolve public Supabase URL for image path
    const publicImage = fileUrlMap[prod.image] || prod.image

    return {
      slug: prod.slug,
      name: prod.title,
      subtitle: prod.subtitle,
      brand_id: brandId,
      brand_name: prod.brand,
      category: prod.category,
      description: prod.overview,
      best_suited: prod.bestSuited,
      benefits: prod.benefits,
      features: prod.features,
      applications: prod.applications,
      requirements: prod.requirements,
      specifications: prod.specifications,
      power_type: prod.powerType,
      shower_use: prod.showerUse || null,
      status: prod.status,
      featured: prod.heroColor ? true : false, // Feature if color scheme configured
      display_order: idx + 1,
      image: publicImage,
      gallery_images: [publicImage], // Fallback gallery images
      hero_color: prod.heroColor || null,
      gallery_colors: prod.galleryColors || []
    }
  })

  const { error: productsErr } = await supabase.from('products').insert(dbProducts)
  if (productsErr) {
    throw new Error(`Failed to seed products: ${productsErr.message}`)
  }
  console.log(`- Successfully seeded ${dbProducts.length} products.`)

  // 5. Seed FAQs
  console.log('\n❓ Seeding FAQs...')
  const dbFaqs = faqs.map((faq, idx) => ({
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    display_order: idx + 1,
    visible: true
  }))

  const { error: faqsErr } = await supabase.from('faqs').insert(dbFaqs)
  if (faqsErr) {
    throw new Error(`Failed to seed FAQs: ${faqsErr.message}`)
  }
  console.log(`- Successfully seeded ${dbFaqs.length} FAQs.`)

  // 6. Seed Gallery (Happy Customers)
  console.log('\n📸 Seeding Customer Gallery...')
  const dbGallery = projects.map((proj, idx) => {
    const publicImage = fileUrlMap[proj.image] || proj.image
    let category = 'villa'
    if (proj.id.includes('hotel') || proj.id.includes('commercial')) {
      category = 'commercial'
    } else if (proj.id.includes('penthouse') || proj.id.includes('apartment')) {
      category = 'apartment'
    }

    return {
      image: publicImage,
      caption: `${proj.title} — ${proj.location}`,
      category: category,
      display_order: idx + 1,
      visible: true
    }
  })

  const { error: galleryErr } = await supabase.from('gallery_images').insert(dbGallery)
  if (galleryErr) {
    throw new Error(`Failed to seed customer gallery: ${galleryErr.message}`)
  }
  console.log(`- Successfully seeded ${dbGallery.length} gallery images.`)

  console.log('\n🎉 Seeding Completed Successfully! All database tables populated & assets uploaded.')
}

main().catch(err => {
  console.error('\n❌ Seeding Failed:', err)
  process.exit(1)
})
