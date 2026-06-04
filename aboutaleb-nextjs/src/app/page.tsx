'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import UniversitiesSection from '@/components/sections/UniversitiesSection'
import ServicesSection from '@/components/sections/ServicesSection'
import StepsSection from '@/components/sections/StepsSection'
import ContactSection from '@/components/sections/ContactSection'
import AuthModal from '@/components/ui/AuthModal'
import FloatingButtons from '@/components/ui/FloatingButtons'

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />

      <main>
        <HeroSection />
        <StatsBar />
        <UniversitiesSection />
        <ServicesSection />
        <StepsSection />
        <ContactSection onAuthRequired={() => setAuthOpen(true)} />
      </main>

      <Footer />
      <FloatingButtons />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
