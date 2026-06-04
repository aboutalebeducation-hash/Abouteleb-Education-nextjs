'use client'

import { useLang } from '@/hooks/useLang'

const FOOTER_SOCIALS = [
  { icon: 'fab fa-whatsapp',        href: 'https://wa.me/+905015959880' },
  { icon: 'fab fa-instagram',       href: 'https://www.instagram.com/abou.taleb.education' },
  { icon: 'fab fa-facebook-f',      href: 'https://www.facebook.com/AbouTalebEducation' },
  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/ABOUTALEBEDU' },
  { icon: 'fab fa-linkedin-in',     href: 'https://www.linkedin.com/in/abou-taleb-education-108b413a7' },
  { icon: 'fab fa-tiktok',          href: 'https://www.tiktok.com/@aboutaleb.education' },
  { icon: 'fas fa-envelope',        href: 'mailto:info@aboutalebeducation.com' },
]

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#0f172a] text-slate-400 py-10 text-center px-6">
      <div className="mb-5">
        <div className="text-white font-black text-xl leading-tight">
          Abou-Taleb<br /><span className="text-[#C0392B]">Education</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {FOOTER_SOCIALS.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white
              hover:bg-[#C0392B] hover:-translate-y-1 transition-all text-sm"
          >
            <i className={s.icon} />
          </a>
        ))}
      </div>

      <div className="border-t border-white/5 pt-5 text-xs">
        &copy; 2026 Abou-Taleb Education. {t.footer}
      </div>
    </footer>
  )
}
