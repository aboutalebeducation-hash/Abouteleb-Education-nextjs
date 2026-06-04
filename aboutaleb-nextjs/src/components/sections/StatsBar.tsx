'use client'

import { useInView } from 'react-intersection-observer'
import { useLang } from '@/hooks/useLang'

export default function StatsBar() {
  const { t } = useLang()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`relative z-50 bg-white rounded-2xl max-w-4xl mx-auto -mt-10 px-6 py-5
        grid grid-cols-2 md:grid-cols-4 gap-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08)]
        transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {t.stats.map((stat, i) => (
        <div
          key={i}
          className={`text-center py-2 ${i > 0 ? 'border-t md:border-t-0 md:border-s border-slate-100' : ''}`}
        >
          <span className="block text-2xl md:text-3xl font-black text-[#C0392B]">{stat.num}</span>
          <span className="text-xs text-slate-500 font-semibold">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
