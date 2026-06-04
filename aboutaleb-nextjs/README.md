# Abou-Taleb Education — Next.js Full-Stack Website

موقع متكامل مبني بـ **Next.js 14 + TypeScript + Tailwind CSS + Supabase**

---

## 🗂️ هيكل المشروع

```
aboutaleb-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + providers
│   │   ├── globals.css         # Global styles
│   │   ├── page.tsx            # الصفحة الرئيسية
│   │   └── dashboard/
│   │       └── page.tsx        # لوحة تحكم الطالب
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # شريط التنقل
│   │   │   └── Footer.tsx      # الفوتر
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── UniversitiesSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── StepsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── AuthModal.tsx   # نافذة تسجيل الدخول
│   │       └── FloatingButtons.tsx
│   ├── hooks/
│   │   ├── useLang.tsx         # إدارة اللغة (عربي/إنجليزي)
│   │   └── useAuth.tsx         # إدارة المصادقة (Supabase Auth)
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   ├── i18n.ts             # ترجمات عربي/إنجليزي
│   │   └── constants.ts        # قائمة الجامعات والثوابت
│   └── types/
│       └── database.ts         # TypeScript types لـ Supabase
├── supabase-schema.sql         # ⚠️ شغّله في Supabase SQL Editor
├── .env.local.example          # نسخه وأضف بياناتك
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 خطوات التشغيل

### 1. إنشاء مشروع Supabase

1. اذهب إلى [app.supabase.com](https://app.supabase.com) وأنشئ مشروعاً جديداً
2. في **SQL Editor** → الصق محتوى `supabase-schema.sql` واضغط **Run**
3. في **Settings → API** انسخ:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. إعداد متغيرات البيئة

```bash
cp .env.local.example .env.local
# ثم افتح .env.local وأضف قيمك
```

### 3. تثبيت الحزم

```bash
npm install
```

### 4. تشغيل محلي

```bash
npm run dev
# الموقع على: http://localhost:3000
```

---

## 🌐 النشر على Vercel

1. ارفع المشروع إلى GitHub
2. اذهب إلى [vercel.com](https://vercel.com) → **New Project** → اختر المستودع
3. في **Environment Variables** أضف:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. اضغط **Deploy** ✅

---

## ✨ المميزات

| الميزة | التقنية |
|--------|---------|
| عربي / إنجليزي RTL/LTR | Custom i18n hook |
| تسجيل الدخول / إنشاء حساب | Supabase Auth |
| حفظ طلبات الطلاب | Supabase Database (leads table) |
| لوحة تحكم الطالب | /dashboard page |
| قاعدة البيانات | Supabase PostgreSQL + RLS |
| تصميم متجاوب | Tailwind CSS |
| أداء عالٍ | Next.js 14 App Router |
| نشر مجاني | Vercel |

---

## 📌 ملاحظات

- صور الجامعات: ضع ملفات PNG في `public/images/` بنفس أسماء `slug` في `constants.ts`
- شعار الموقع: ضعه في `public/images/logo.png`
- بريد إلكتروني للطلبات: يمكن إضافة Supabase Edge Functions لإرسال إيميل تلقائي
