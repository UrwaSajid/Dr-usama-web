-- ============================================================
-- 004_seed.sql  —  Dr. Muhammad Usama — sample data
-- ============================================================
-- Run AFTER creating your auth user in the Supabase dashboard.
-- Replace 'YOUR_AUTH_USER_UUID' with the actual UUID from auth.users.

-- ─────────────────────────────────────────
-- Make the professor account
-- ─────────────────────────────────────────
UPDATE profiles SET
  full_name       = 'Dr. Muhammad Usama',
  title           = 'Assistant Professor',
  institution     = 'University of Agriculture Faisalabad',
  bio             = 'Computer Science educator specializing in Generative AI, Computer Architecture, and Data Science. Passionate about bridging theory and real-world application.',
  years_exp       = 8,
  publications    = 24,
  students_taught = 1200,
  is_professor    = true
WHERE email = 'muhammad.usama@uaf.edu.pk';   -- ← change to your email

-- ─────────────────────────────────────────
-- COURSES
-- ─────────────────────────────────────────
INSERT INTO courses (slug, title, subtitle, description, color, panel_number, is_published)
VALUES
(
  'generative-ai',
  'Generative AI',
  'From Transformers to Diffusion Models',
  'A deep-dive into the architecture, training, and application of modern generative models including GPT, DALL·E, Stable Diffusion, and more. Students will build projects using Hugging Face, LangChain, and OpenAI APIs.',
  '#D85A30',
  1,
  true
),
(
  'computer-architecture',
  'Computer Architecture',
  'How Machines Think at Silicon Level',
  'Explore the design of modern processors — pipelining, caching, branch prediction, RISC vs CISC, and parallel architectures. Hands-on with assembly-level programming.',
  '#993C1D',
  2,
  true
),
(
  'data-science',
  'Data Science',
  'From Raw Data to Real Insight',
  'End-to-end data science: data wrangling, EDA, statistical modeling, machine learning, and visualization. Python-based with real-world datasets from agriculture, health, and economics.',
  '#7A2E14',
  3,
  true
);

-- ─────────────────────────────────────────
-- CHAPTERS — Generative AI
-- ─────────────────────────────────────────
WITH course AS (SELECT id FROM courses WHERE slug = 'generative-ai')
INSERT INTO chapters (course_id, title, description, position, is_published)
SELECT course.id, ch.title, ch.descr, ch.pos, true FROM course,
(VALUES
  (0, 'Foundations of Deep Learning',       'Neural networks, backprop, and the road to generative models'),
  (1, 'Transformers & Attention Mechanism',  'Self-attention, multi-head attention, positional encoding'),
  (2, 'Large Language Models',               'GPT family, instruction tuning, RLHF, and prompt engineering'),
  (3, 'Diffusion Models & Image Generation', 'DALL·E, Stable Diffusion, ControlNet'),
  (4, 'Building AI Applications',            'LangChain, vector databases, RAG pipelines')
) AS ch(pos, title, descr);

-- ─────────────────────────────────────────
-- CHAPTERS — Computer Architecture
-- ─────────────────────────────────────────
WITH course AS (SELECT id FROM courses WHERE slug = 'computer-architecture')
INSERT INTO chapters (course_id, title, description, position, is_published)
SELECT course.id, ch.title, ch.descr, ch.pos, true FROM course,
(VALUES
  (0, 'Digital Logic Fundamentals',          'Boolean algebra, gates, flip-flops'),
  (1, 'Instruction Set Architecture',        'ISA design, RISC vs CISC, MIPS & ARM'),
  (2, 'Pipelining',                          'Hazards, forwarding, branch prediction'),
  (3, 'Memory Hierarchy',                    'Caches, virtual memory, TLBs'),
  (4, 'Parallel Architectures',              'Multicore, SIMD, GPU architectures')
) AS ch(pos, title, descr);

-- ─────────────────────────────────────────
-- CHAPTERS — Data Science
-- ─────────────────────────────────────────
WITH course AS (SELECT id FROM courses WHERE slug = 'data-science')
INSERT INTO chapters (course_id, title, description, position, is_published)
SELECT course.id, ch.title, ch.descr, ch.pos, true FROM course,
(VALUES
  (0, 'Python for Data Science',             'NumPy, Pandas, Matplotlib essentials'),
  (1, 'Exploratory Data Analysis',           'Statistical summaries, distributions, correlation'),
  (2, 'Machine Learning Fundamentals',       'Supervised and unsupervised learning'),
  (3, 'Feature Engineering',                 'Encoding, scaling, selection, PCA'),
  (4, 'Model Evaluation & Deployment',       'Cross-validation, metrics, FastAPI deployment')
) AS ch(pos, title, descr);

-- ─────────────────────────────────────────
-- ANNOUNCEMENTS
-- ─────────────────────────────────────────
INSERT INTO announcements (title, body, is_pinned, is_published)
VALUES
(
  'Welcome to the Classroom Universe!',
  'All course materials, assignments, and resources are now available on this platform. No more hunting across LinkedIn or Drive — everything lives here. Explore the courses, open a chapter, and start learning!',
  true, true
),
(
  'Mid-Semester Schedule Update',
  'The quiz for Chapter 3 (Computer Architecture) has been moved to next week. Please review the pipelining slides before then. Additional practice problems uploaded in the resources section.',
  false, true
),
(
  'New Research Paper Added — GenAI Course',
  'I have uploaded the "Attention is All You Need" paper and my annotated version to Chapter 2 of the Generative AI course. Strongly recommended reading before the next lecture.',
  false, true
);
