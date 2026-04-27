-- ============================================================
-- 003_storage.sql  —  Supabase Storage buckets
-- ============================================================

-- PDFs bucket (private — signed URLs)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pdfs', 'pdfs', false, 52428800,  -- 50 MB
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Videos bucket (public CDN)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos', 'videos', true, 524288000, -- 500 MB
  ARRAY['video/mp4','video/webm','video/ogg']
) ON CONFLICT (id) DO NOTHING;

-- Avatars / course covers bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 'images', true, 10485760,  -- 10 MB
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Storage RLS policies
-- ─────────────────────────────────────────

-- PDFs: only professor uploads; any user can read (via signed URL)
CREATE POLICY "Professor uploads PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdfs' AND is_professor());

CREATE POLICY "Professor deletes PDFs"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'pdfs' AND is_professor());

CREATE POLICY "Authenticated users read PDFs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdfs');

-- Videos: professor uploads; public reads
CREATE POLICY "Professor uploads videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'videos' AND is_professor());

CREATE POLICY "Public reads videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'videos');

-- Images: professor manages; public reads
CREATE POLICY "Professor manages images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'images' AND is_professor())
  WITH CHECK (bucket_id = 'images' AND is_professor());

CREATE POLICY "Public reads images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');
