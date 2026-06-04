'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'
import { UNIVERSITIES } from '@/lib/constants'
import type { Language } from '@/lib/i18n'

interface NavbarProps {
  onAuthClick: () => void
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const { lang, t, setLang, dir } = useLang()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [uniDropOpen, setUniDropOpen] = useState(false)
  const [contactDropOpen, setContactDropOpen] = useState(false)
  const [langDropOpen, setLangDropOpen] = useState(false)
  const uniRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (uniRef.current && !uniRef.current.contains(e.target as Node)) setUniDropOpen(false)
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactDropOpen(false)
      setLangDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const contactLinks = [
    { icon: 'fab fa-whatsapp', label: lang === 'ar' ? 'واتساب' : 'WhatsApp', href: 'https://wa.me/+905015959880', color: '#25D366' },
    { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://www.instagram.com/abou.taleb.education', color: '#E1306C' },
    { icon: 'fab fa-facebook-f', label: 'Facebook', href: 'https://www.facebook.com/AbouTalebEducation', color: '#1877F2' },
    { icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)', href: 'https://x.com/ABOUTALEBEDU', color: '#000' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/abou-taleb-education-108b413a7', color: '#0A66C2' },
    { icon: 'fab fa-tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@aboutaleb.education', color: '#000' },
    { icon: 'fas fa-envelope', label: 'info@aboutalebeducation.com', href: 'mailto:info@aboutalebeducation.com', color: '#C0392B' },
    { icon: 'fas fa-envelope', label: 'AboutalebEducation@gmail.com', href: 'mailto:AboutalebEducation@gmail.com', color: '#C0392B' },
  ]

  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[1999]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Nav */}
      <div
        className={`fixed top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[80%] max-w-[350px] h-full bg-black z-[2000] 
          flex flex-col gap-5 p-8 overflow-y-auto transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')}`}
      >
        <button className="self-end text-white" onClick={() => setMobileOpen(false)}>
          <X size={24} />
        </button>
        {[
          { href: '#home', label: t.nav.home },
          { href: '#services', label: t.nav.services },
          { href: '#universities', label: t.nav.universities },
          { href: '#steps', label: t.nav.steps },
          { href: '#contact', label: t.nav.contact },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="text-white font-bold text-lg border-b border-white/10 pb-3 hover:text-red-400 transition-colors"
          >
            {label}
          </a>
        ))}
        <button
          onClick={() => { onAuthClick(); setMobileOpen(false) }}
          className="mt-4 bg-[#C0392B] text-white font-bold py-3 rounded-full"
        >
          {user ? t.nav.myProfile : t.nav.login}
        </button>
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="border border-[#C0392B] text-[#C0392B] font-bold py-3 rounded-full text-center"
        >
          {t.nav.register}
        </a>
      </div>

      {/* Main Nav */}
      <nav
        className={`sticky top-0 z-[1000] flex items-center justify-between px-[5%] h-[85px] transition-all duration-300
          ${scrolled
            ? 'bg-black/98 backdrop-blur-md shadow-lg border-b border-white/10'
            : 'bg-black/96 backdrop-blur-sm border-b border-white/8'}`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 no-underline group">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#C0392B] group-hover:border-white transition-colors">
            <Image
              src="/images/logo.png"
              alt="Abou-Taleb Logo"
              width={60}
              height={60}
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x60?text=AT' }}
            />
          </div>
          <div className="text-white font-black text-lg leading-tight">
            Abou-Taleb<br /><span className="text-[#C0392B]">Education</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#home" className="text-slate-200 font-semibold text-sm hover:text-white hover:border-b-2 hover:border-[#C0392B] pb-1 transition-all">{t.nav.home}</a>
          <a href="#services" className="text-slate-200 font-semibold text-sm hover:text-white hover:border-b-2 hover:border-[#C0392B] pb-1 transition-all">{t.nav.services}</a>

          {/* Universities Dropdown */}
          <div ref={uniRef} className="relative">
            <button
              onClick={() => setUniDropOpen(v => !v)}
              className="flex items-center gap-1 text-slate-200 font-semibold text-sm hover:text-white pb-1 transition-all"
            >
              {t.nav.universities} <ChevronDown size={14} className={`transition-transform ${uniDropOpen ? 'rotate-180' : ''}`} />
            </button>
            {uniDropOpen && (
              <div className="absolute top-10 start-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 w-[900px] max-w-[92vw] max-h-[60vh] overflow-y-auto z-[1100] scrollbar-thin">
                <div className="grid grid-cols-4 gap-3 direction-rtl">
                  {UNIVERSITIES.map(u => (
                    <a
                      key={u.slug}
                      href="#universities"
                      onClick={() => setUniDropOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 hover:text-[#C0392B] transition-all text-slate-700 font-semibold text-xs"
                    >
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image src={`/images/${u.slug}.png`} alt={u.nameAr} width={28} height={28} className="object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      </div>
                      <span>{lang === 'ar' ? u.nameAr : u.nameEn}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#steps" className="text-slate-200 font-semibold text-sm hover:text-white hover:border-b-2 hover:border-[#C0392B] pb-1 transition-all">{t.nav.steps}</a>

          {/* Contact Dropdown */}
          <div ref={contactRef} className="relative">
            <button
              onClick={() => setContactDropOpen(v => !v)}
              className="flex items-center gap-1 text-slate-200 font-semibold text-sm hover:text-white pb-1 transition-all"
            >
              {t.nav.contact} <ChevronDown size={14} className={`transition-transform ${contactDropOpen ? 'rotate-180' : ''}`} />
            </button>
            {contactDropOpen && (
              <div className="absolute top-10 end-0 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 w-72 z-[1100]">
                {contactLinks.map((lnk, i) => (
                  <a
                    key={i}
                    href={lnk.href}
                    target={lnk.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all text-slate-700 font-semibold text-sm"
                    onClick={() => setContactDropOpen(false)}
                  >
                    <i className={`${lnk.icon} text-base`} style={{ color: lnk.color }} />
                    <span>{lnk.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangDropOpen(v => !v) }}
              className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/15 transition-all"
            >
              <Globe size={14} />
              {lang === 'ar' ? 'العربية' : 'English'} ▾
            </button>
            {langDropOpen && (
              <div className="absolute top-12 end-0 bg-[#1e1e2a] rounded-2xl min-w-[160px] overflow-hidden shadow-2xl z-[1100]">
                {(['ar', 'en'] as Language[]).map(code => (
                  <div
                    key={code}
                    onClick={() => { setLang(code); setLangDropOpen(false) }}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 text-sm transition-all
                      ${lang === code ? 'bg-[#C0392B] text-white' : 'text-slate-300 hover:bg-[#C0392B] hover:text-white'}`}
                  >
                    {code === 'ar' ? '🇸🇦 العربية' : '🇬🇧 English'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          <button
            onClick={onAuthClick}
            className="hidden sm:block bg-white/10 border border-white/30 px-4 py-2 rounded-full text-white text-sm font-semibold hover:bg-[#C0392B] hover:border-[#C0392B] transition-all"
          >
            {user ? t.nav.myProfile : t.nav.login}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden lg:block bg-[#C0392B] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#9a2e22] hover:-translate-y-0.5 transition-all shadow-glow-sm"
          >
            {t.nav.register}
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>
    </>
  )
}
