'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useLang } from '@/hooks/useLang'
import { UNIVERSITIES } from '@/lib/constants'

export default function UniversitiesSection() {
  const { lang, t } = useLang()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll on desktop
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animFrame: number
    let pos = 0
    const speed = 0.5

    const animate = () => {
      pos += speed
      if (pos >= el.scrollWidth / 2) pos = 0
      el.scrollLeft = pos
      animFrame = requestAnimationFrame(animate)
    }

    const start = () => { animFrame = requestAnimationFrame(animate) }
    const stop = () => cancelAnimationFrame(animFrame)

    const timer = setTimeout(start, 1000)
    el.addEventListener('mouseenter', stop)
    el.addEventListener('mouseleave', start)
    el.addEventListener('touchstart', stop, { passive: true })

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animFrame)
      el.removeEventListener('mouseenter', stop)
      el.removeEventListener('mouseleave', start)
      el.removeEventListener('touchstart', stop)
    }
  }, [])

  const doubled = [...UNIVERSITIES, ...UNIVERSITIES]

  return (
    <section id="universities" className="py-16 md:py-20">
      <div
        ref={ref}
        className={`text-center mb-10 px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <span className="text-[#C0392B] font-extrabold uppercase text-xs tracking-widest block mb-2">
          {t.universities.tag}
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.universities.title}</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">{t.universities.sub}</p>
      </div>

      {/* Scrolling universities strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-thin pb-3 px-[5%] scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {doubled.map((uni, i) => (
          <div
            key={`${uni.slug}-${i}`}
            className="flex-shrink-0 bg-white rounded-2xl p-4 text-center border border-slate-100
              hover:border-[#C0392B] hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.12)]
              transition-all duration-300 cursor-pointer group"
            style={{ width: '160px', scrollSnapAlign: 'start' }}
          >
            {uni.discount > 0 && (
              <span className="inline-block bg-[#C0392B]/10 text-[#C0392B] text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                -{uni.discount}%
              </span>
            )}
            <div className="w-20 h-20 mx-auto mb-2 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                src={`/images/${uni.slug}.png`}
                alt={uni.nameAr}
                width={70}
                height={70}
                className="object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.display = 'none'
                  img.parentElement!.innerHTML = `<span class="text-[10px] font-bold text-slate-400 text-center leading-tight px-1">${uni.nameEn.split(' ').slice(0,2).join('\n')}</span>`
                }}
              />
            </div>
            <h4 className="font-extrabold text-[11px] text-slate-700 leading-snug">
              {lang === 'ar' ? uni.nameAr : uni.nameEn}
            </h4>
            <span className="text-[10px] text-slate-400 mt-0.5 block">{uni.city}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
