import type { Metadata } from 'next'
import { Cairo, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/hooks/useLang'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abou-Taleb Education | الدراسة في تركيا',
  description: 'وكيل معتمد لأكثر من 50 جامعة تركية. قبولات مجانية وخصومات تصل إلى 70%',
  keywords: 'الدراسة في تركيا, قبولات جامعية, جامعات تركية, education turkey, study abroad',
  authors: [{ name: 'Abou-Taleb Education' }],
  openGraph: {
    title: 'Abou-Taleb Education | الدراسة في تركيا',
    description: 'وكيل معتمد لأكثر من 50 جامعة تركية',
    type: 'website',
    locale: 'ar_AR',
    alternateLocale: 'en_US',
  },
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${playfair.variable}`}>
      <body className="font-cairo bg-slate-50 text-slate-900 overflow-x-hidden">
        <AuthProvider>
          <LangProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: { fontFamily: 'Cairo, sans-serif', direction: 'rtl' },
                duration: 4000,
              }}
            />
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
