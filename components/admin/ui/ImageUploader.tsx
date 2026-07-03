'use client'

import React from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
  bucket: 'products' | 'gallery' | 'brands' | 'media'
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
}

export function ImageUploader({
  bucket,
  value,
  onChange,
  label,
  hint,
}: ImageUploaderProps) {
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const supabase = createClient()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate image type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.')
      return
    }

    setUploading(true)

    try {
      // Create a clean, unique file name
      const fileExt = file.name.split('.').pop()
      const cleanName = file.name
        .substring(0, file.name.lastIndexOf('.'))
        .replace(/[^a-zA-Z0-9-_]/g, '_')
      const fileName = `${Date.now()}-${cleanName}.${fileExt}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path)

      onChange(publicUrl)
      toast.success('Image uploaded successfully.')
    } catch (err) {
      console.error('Upload error:', err)
      const message = err instanceof Error ? err.message : 'Failed to upload image'
      toast.error(message + '. Make sure storage buckets exist.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  function handleRemove() {
    onChange('')
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans">
          {label}
        </span>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={uploading}
      />

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-navy-primary/10 bg-[#F8F9FB] h-36 w-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Upload preview"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-navy-primary px-3 py-1.5 rounded-lg text-xs font-semibold font-sans shadow-sm transition-all"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500/90 hover:bg-red-500 text-white p-1.5 rounded-lg shadow-sm transition-all"
              aria-label="Remove image"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 rounded-xl border border-dashed border-navy-primary/20 hover:border-gold-primary bg-[#F8F9FB] hover:bg-gold-primary/[0.02] flex flex-col items-center justify-center gap-2 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 text-gold-primary animate-spin" />
              <span className="text-[11px] text-navy-primary/50 font-sans font-medium">
                Uploading image…
              </span>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-lg bg-navy-primary/5 group-hover:bg-gold-primary/10 flex items-center justify-center transition-colors">
                <Upload className="w-4 h-4 text-navy-primary/45 group-hover:text-gold-primary transition-colors" />
              </div>
              <div className="text-center">
                <span className="text-[11px] text-navy-primary font-sans font-semibold">
                  Click to Upload
                </span>
                <span className="block text-[9px] text-navy-primary/35 font-sans mt-0.5">
                  PNG, JPG or WEBP up to 5MB
                </span>
              </div>
            </>
          )}
        </button>
      )}

      {hint && !uploading && (
        <p className="text-[10px] text-navy-primary/30 font-sans leading-normal mt-1">
          {hint}
        </p>
      )}
    </div>
  )
}
