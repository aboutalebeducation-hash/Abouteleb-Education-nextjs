'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* WhatsApp Float */}
      <a
        href="https://wa.me/+905015959880"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 start-5 w-14 h-14 bg-[#25D366] text-white rounded-full
          flex items-center justify-center text-2xl z-[1000] shadow-[0_4px_15px_rgba(0,0,0,0.25)]
          whatsapp-pulse hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 end-5 w-12 h-12 bg-[#C0392B] text-white rounded-full
          flex items-center justify-center z-[1000] shadow-[0_4px_15px_rgba(0,0,0,0.2)]
          hover:bg-[#9a2e22] hover:-translate-y-1 transition-all
          ${showScroll ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}
