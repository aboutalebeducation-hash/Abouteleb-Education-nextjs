'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Language } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface LangContextType {
  lang: Language
  t: typeof translations['ar']
  setLang: (lang: Language) => void
  dir: 'rtl' | 'ltr'
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar')

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = translations[newLang].dir
  }, [])

  return (
    <LangContext.Provider value={{
      lang,
      t: translations[lang],
      setLang,
      dir: translations[lang].dir,
    }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
