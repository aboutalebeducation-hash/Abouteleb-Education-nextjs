'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const SOCIAL_LINKS = [
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/+905015959880', label: 'واتساب: +90 501 595 98 80', labelEn: 'WhatsApp: +90 501 595 98 80' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/abou.taleb.education', label: 'إنستجرام', labelEn: 'Instagram' },
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/AbouTalebEducation', label: 'فيسبوك', labelEn: 'Facebook' },
  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/ABOUTALEBEDU', label: 'إكس', labelEn: 'X (Twitter)' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/abou-taleb-education-108b413a7', label: 'لينكدإن', labelEn: 'LinkedIn' },
  { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@aboutaleb.education', label: 'تيك توك', labelEn: 'TikTok' },
  { icon: 'fas fa-envelope', href: 'mailto:info@aboutalebeducation.com', label: 'info@aboutalebeducation.com', labelEn: 'info@aboutalebeducation.com' },
  { icon: 'fas fa-envelope', href: 'mailto:AboutalebEducation@gmail.com', label: 'AboutalebEducation@gmail.com', labelEn: 'AboutalebEducation@gmail.com' },
]

export default function ContactSection({ onAuthRequired }: { onAuthRequired: () => void }) {
  const { lang, t } = useLang()
  const { user } = useAuth()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const [form, setForm] = useState({ full_name: '', email: '', phone: '', major: 'medicine' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      onAuthRequired()
      return
    }

    if (!form.full_name || !form.email || !form.phone) {
      toast.error(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        major: form.major,
        lang: lang,
        status: 'new' as const,
      })

      if (error) throw error

      toast.success(t.contact.form.success)
      setForm({ full_name: '', email: '', phone: '', major: 'medicine' })
    } catch (err) {
      console.error(err)
      toast.error(t.contact.form.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-slate-900 text-white">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">{t.contact.title}</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">{t.contact.desc}</p>
          <div className="space-y-4">
            {SOCIAL_LINKS.map((lnk, i) => (
              <a
                key={i}
                href={lnk.href}
                target={lnk.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white hover:translate-x-[-3px] transition-all"
              >
                <span className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center text-sm hover:bg-[#C0392B] transition-colors">
                  <i className={lnk.icon} />
                </span>
                <span className="text-sm font-medium">{lang === 'ar' ? lnk.label : lnk.labelEn}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white text-slate-900 rounded-3xl p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1.5">{t.contact.form.name}</label>
              <input
                type="text"
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                placeholder={t.contact.form.namePlaceholder}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">{t.contact.form.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="example@domain.com"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">{t.contact.form.phone}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+90 500 000 0000"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">{t.contact.form.major}</label>
              <select
                value={form.major}
                onChange={e => setForm(f => ({ ...f, major: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-cairo text-sm bg-white focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all"
              >
                {Object.entries(t.contact.form.majors).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C0392B] text-white py-3.5 rounded-xl font-black text-sm hover:bg-[#9a2e22] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[0_4px_15px_rgba(192,57,43,0.3)] flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
