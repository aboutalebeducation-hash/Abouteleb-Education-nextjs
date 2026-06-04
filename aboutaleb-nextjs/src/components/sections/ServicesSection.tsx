'use client'

import { GraduationCap, Percent, FileText, Home } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useLang } from '@/hooks/useLang'

const ICONS = [GraduationCap, Percent, FileText, Home]

export default function ServicesSection() {
  const { t } = useLang()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50/80">
      <div
        ref={ref}
        className={`text-center mb-10 px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <span className="text-[#C0392B] font-extrabold uppercase text-xs tracking-widest block mb-2">
          {t.services.tag}
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900">{t.services.title}</h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.services.items.map((item, i) => {
          const Icon = ICONS[i]
          const { ref: cardRef, inView: cardVisible } = useInView({ triggerOnce: true, threshold: 0.1 })
          return (
            <div
              key={i}
              ref={cardRef}
              className={`bg-white p-7 rounded-2xl text-center border border-slate-100
                hover:-translate-y-2 hover:border-[#C0392B] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]
                transition-all duration-300 group
                ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#C0392B]/5 flex items-center justify-center
                group-hover:bg-[#C0392B] transition-colors duration-300">
                <Icon size={28} className="text-[#C0392B] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
