-- ============================================================
-- 001_schema.sql  —  Dr. Usama Classroom Platform
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES  (extends auth.users)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL DEFAULT '',
  avatar_url    TEXT,
  bio           TEXT,
  title         TEXT DEFAULT 'Assistant Professor',
  institution   TEXT DEFAULT 'University of Agriculture Faisalabad',
  years_exp     INT  DEFAULT 0,
  publications  INT  DEFAULT 0,
  students_taught INT DEFAULT 0,
  is_professor  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- COURSES
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  subtitle      TEXT,
  description   TEXT,
  cover_url     TEXT,
  color         TEXT DEFAULT '#D85A30',      -- coral accent per course
  panel_number  INT,                          -- display as Panel #01
  professor_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CHAPTERS  (a.k.a. Modules)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chapters (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  position      INT  NOT NULL DEFAULT 0,     -- for ordering
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- RESOURCES
-- ─────────────────────────────────────────
CREATE TYPE resource_type AS ENUM ('pdf', 'video', 'link', 'image', 'other');

CREATE TABLE IF NOT EXISTS resources (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id    UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  type          resource_type NOT NULL DEFAULT 'link',
  url           TEXT NOT NULL,
  file_size     BIGINT,                       -- bytes, for PDFs
  duration_sec  INT,                          -- seconds, for videos
  position      INT NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- ANNOUNCEMENTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id     UUID REFERENCES courses(id) ON DELETE SET NULL,  -- NULL = global
  professor_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  is_pinned     BOOLEAN NOT NULL DEFAULT false,
  is_published  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- UPDATED_AT triggers
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated    BEFORE UPDATE ON profiles    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_courses_updated     BEFORE UPDATE ON courses     FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_chapters_updated    BEFORE UPDATE ON chapters    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_resources_updated   BEFORE UPDATE ON resources   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_announcements_upd   BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────
CREATE INDEX idx_courses_slug        ON courses(slug);
CREATE INDEX idx_courses_professor   ON courses(professor_id);
CREATE INDEX idx_chapters_course     ON chapters(course_id, position);
CREATE INDEX idx_resources_chapter   ON resources(chapter_id, position);
CREATE INDEX idx_announcements_course ON announcements(course_id, created_at DESC);

-- ─────────────────────────────────────────
-- Profile auto-create on auth.users insert
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
