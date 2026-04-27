-- ============================================================
-- 002_rls.sql  —  Row Level Security policies
-- ============================================================

ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses       ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters      ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources     ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Helper: is current user the professor?
CREATE OR REPLACE FUNCTION is_professor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_professor = true
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
CREATE POLICY "Profiles are public read"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ─────────────────────────────────────────
-- COURSES
-- ─────────────────────────────────────────
CREATE POLICY "Published courses are public"
  ON courses FOR SELECT
  USING (is_published = true OR is_professor());

CREATE POLICY "Professor can insert courses"
  ON courses FOR INSERT
  WITH CHECK (is_professor());

CREATE POLICY "Professor can update courses"
  ON courses FOR UPDATE
  USING (is_professor());

CREATE POLICY "Professor can delete courses"
  ON courses FOR DELETE
  USING (is_professor());

-- ─────────────────────────────────────────
-- CHAPTERS
-- ─────────────────────────────────────────
CREATE POLICY "Published chapters public"
  ON chapters FOR SELECT
  USING (
    is_professor() OR (
      is_published = true AND EXISTS (
        SELECT 1 FROM courses c WHERE c.id = course_id AND c.is_published = true
      )
    )
  );

CREATE POLICY "Professor can manage chapters"
  ON chapters FOR ALL
  USING (is_professor())
  WITH CHECK (is_professor());

-- ─────────────────────────────────────────
-- RESOURCES
-- ─────────────────────────────────────────
CREATE POLICY "Published resources public"
  ON resources FOR SELECT
  USING (
    is_professor() OR (
      is_published = true AND EXISTS (
        SELECT 1 FROM chapters ch
        JOIN courses c ON c.id = ch.course_id
        WHERE ch.id = chapter_id
          AND ch.is_published = true
          AND c.is_published  = true
      )
    )
  );

CREATE POLICY "Professor can manage resources"
  ON resources FOR ALL
  USING (is_professor())
  WITH CHECK (is_professor());

-- ─────────────────────────────────────────
-- ANNOUNCEMENTS
-- ─────────────────────────────────────────
CREATE POLICY "Published announcements public"
  ON announcements FOR SELECT
  USING (is_published = true OR is_professor());

CREATE POLICY "Professor can manage announcements"
  ON announcements FOR ALL
  USING (is_professor())
  WITH CHECK (is_professor());
