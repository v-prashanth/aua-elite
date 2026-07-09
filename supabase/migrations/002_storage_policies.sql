-- ============================================================
-- AQUA ELITE SOLUTIONS — SUPABASE STORAGE RLS POLICIES
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Allow public read access to objects in public buckets
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('products', 'gallery', 'brands', 'media'));

-- 2. Allow authenticated users to upload (insert) files
CREATE POLICY "Authenticated Insert Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('products', 'gallery', 'brands', 'media'));

-- 3. Allow authenticated users to update files
CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('products', 'gallery', 'brands', 'media'))
WITH CHECK (bucket_id IN ('products', 'gallery', 'brands', 'media'));

-- 4. Allow authenticated users to delete files
CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('products', 'gallery', 'brands', 'media'));
