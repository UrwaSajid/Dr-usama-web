-- Run this once in your Supabase SQL editor:
-- Dashboard → SQL Editor → New query → paste → Run

-- courses: fast lookup by slug and published listing
create index if not exists idx_courses_slug
  on courses (slug);

create index if not exists idx_courses_published_panel
  on courses (is_published, panel_number);

-- chapters: fast lookup by course, ordered by position
create index if not exists idx_chapters_course_position
  on chapters (course_id, position);

create index if not exists idx_chapters_published
  on chapters (course_id, is_published, position);

-- resources: fast lookup by chapter, ordered by position
create index if not exists idx_resources_chapter_position
  on resources (chapter_id, position);

create index if not exists idx_resources_published
  on resources (chapter_id, is_published, position);

-- announcements: fast public feed query (pinned first, then newest)
create index if not exists idx_announcements_feed
  on announcements (is_published, is_pinned desc, created_at desc);

create index if not exists idx_announcements_course
  on announcements (course_id);

-- profiles: fast professor lookup
create index if not exists idx_profiles_professor
  on profiles (is_professor);
