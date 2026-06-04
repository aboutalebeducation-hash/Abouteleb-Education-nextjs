'use client'

import { useInView } from 'react-intersection-observer'
import { useLang } from '@/hooks/useLang'

export default function StepsSection() {
  const { t } = useLang()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="steps" className="py-16 md:py-20">
      <div
        ref={ref}
        className={`text-center mb-12 px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <span className="text-[#C0392B] font-extrabold uppercase text-xs tracking-widest block mb-2">
          {t.steps.tag}
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900">{t.steps.title}</h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {t.steps.items.map((step, i) => {
          const { ref: sRef, inView: sVisible } = useInView({ triggerOnce: true, threshold: 0.15 })
          return (
            <div
              key={i}
              ref={sRef}
              className={`text-center transition-all duration-500 ${sVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-900 border-[3px] border-[#C0392B]
                flex items-center justify-center text-white font-black text-xl shadow-glow-sm">
                {i + 1}
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>

              {/* Connector line (not on last) */}
              {i < t.steps.items.length - 1 && (
                <div className="hidden lg:block absolute w-full h-0.5 bg-slate-200 top-7 start-1/2 -z-10" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
