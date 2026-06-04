-- ====================================================
-- Abou-Taleb Education — Supabase Database Schema
-- Run this in Supabase SQL Editor to set up the database
-- ====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: leads (طلبات التواصل من الموقع)
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  major        TEXT NOT NULL,
  lang         TEXT DEFAULT 'ar',
  status       TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'cancelled')),
  notes        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: students (الطلاب المسجلون)
-- ============================================
CREATE TABLE IF NOT EXISTS public.students (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name      TEXT NOT NULL,
  email          TEXT UNIQUE NOT NULL,
  phone          TEXT,
  nationality    TEXT,
  passport_no    TEXT,
  date_of_birth  DATE,
  major          TEXT,
  university_id  UUID REFERENCES public.universities(id),
  enrollment_year INT,
  status         TEXT DEFAULT 'prospect' CHECK (status IN ('prospect','applied','accepted','enrolled','graduated')),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: universities (الجامعات المتعاقدة)
-- ============================================
CREATE TABLE IF NOT EXISTS public.universities (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  city        TEXT DEFAULT 'Istanbul',
  logo_url    TEXT,
  website     TEXT,
  discount    INT DEFAULT 0,   -- نسبة الخصم %
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: documents (مستندات الطلاب)
-- ============================================
CREATE TABLE IF NOT EXISTS public.documents (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id   UUID REFERENCES public.students(id) ON DELETE CASCADE,
  doc_type     TEXT NOT NULL CHECK (doc_type IN ('passport','transcript','photo','other')),
  file_url     TEXT NOT NULL,
  file_name    TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  uploaded_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.leads       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents   ENABLE ROW LEVEL SECURITY;

-- LEADS: anyone can insert (contact form), only admins read
CREATE POLICY "leads_insert_public" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- UNIVERSITIES: public read
CREATE POLICY "universities_public_read" ON public.universities
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- STUDENTS: users can only see their own data
CREATE POLICY "students_own_data" ON public.students
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- DOCUMENTS: students can manage their own documents
CREATE POLICY "documents_own_data" ON public.documents
  FOR ALL TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- SAMPLE DATA: Universities
-- ============================================
INSERT INTO public.universities (name_ar, name_en, city, logo_url, discount, sort_order) VALUES
  ('جامعة أجيبادم', 'Acıbadem University', 'Istanbul', '/images/acibadem.png', 30, 1),
  ('جامعة ألتين باش', 'Altınbaş University', 'Istanbul', '/images/altinbas.png', 50, 2),
  ('جامعة أنقرة بيليم', 'Ankara Bilim University', 'Ankara', '/images/ankara-bilim.png', 40, 3),
  ('جامعة أنقرة ميديبول', 'Ankara Medipol University', 'Ankara', '/images/ankara-medipol.png', 45, 4),
  ('جامعة أتيليم', 'Atılım University', 'Ankara', '/images/atilim.png', 35, 5),
  ('جامعة بهشه شهير', 'Bahçeşehir University', 'Istanbul', '/images/bahcesehir.png', 60, 6),
  ('جامعة بيكوز', 'Beykoz University', 'Istanbul', '/images/beykoz.png', 40, 7),
  ('جامعة بزم عالم', 'Bezmialem University', 'Istanbul', '/images/bezmialem.png', 25, 8),
  ('جامعة بيروني', 'Biruni University', 'Istanbul', '/images/biruni.png', 50, 9),
  ('جامعة دوغوش', 'Doğuş University', 'Istanbul', '/images/dogus.png', 35, 10)
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_leads_updated
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_students_updated
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================
-- STORAGE: Create bucket for student documents
-- ============================================
-- Run this in Supabase Dashboard → Storage:
-- 1. Create bucket named "student-documents" (private)
-- 2. Create bucket named "university-logos" (public)
