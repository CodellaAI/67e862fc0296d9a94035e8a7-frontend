
'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    setTimeout(() => {
      setIsLoading(false)
      document.body.classList.add('custom-cursor-active')
    }, 2000)

    // Cleanup
    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="home" className="min-h-screen flex items-center">
          <Hero />
        </section>
        
        <section id="about" className="py-20">
          <About />
        </section>
        
        <section id="skills" className="py-20">
          <Skills />
        </section>
        
        <section id="projects" className="py-20">
          <Projects />
        </section>
        
        <section id="experience" className="py-20">
          <Experience />
        </section>
        
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </div>
      <Footer />
    </main>
  )
}
