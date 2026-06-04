'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/hooks/useLang'

export default function HeroSection() {
  const { t } = useLang()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative bg-gradient-to-br from-black via-slate-900 to-[#2d1a1a] py-24 md:py-32 text-center text-white overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C0392B]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#C0392B]/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-50 to-transparent z-10" />

      <div className="relative z-20 max-w-3xl mx-auto px-6">
        {/* Badge */}
        <span className="inline-block bg-[#C0392B]/20 border border-[#C0392B]/40 text-red-300 px-5 py-1.5 rounded-full text-xs font-bold mb-5 tracking-wide">
          {t.hero.badge}
        </span>

        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">
          {t.hero.title}{' '}
          <span className="text-[#C0392B] relative">
            {t.hero.titleHighlight}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C0392B]/60 rounded" />
          </span>{' '}
          {t.hero.titleEnd}
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {t.hero.desc}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="bg-[#C0392B] text-white px-8 py-3 rounded-full font-bold text-sm md:text-base
              hover:bg-[#9a2e22] hover:-translate-y-1 transition-all shadow-[0_8px_20px_rgba(192,57,43,0.35)]"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#services"
            className="bg-transparent border-2 border-white/30 text-white px-8 py-3 rounded-full font-bold text-sm md:text-base
              hover:bg-white hover:text-black hover:border-white transition-all"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  )
}
