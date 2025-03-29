
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { gsap } from 'gsap'

export default function Hero() {
  const particlesRef = useRef(null)
  
  useEffect(() => {
    // Particles animation with GSAP
    const particles = particlesRef.current
    if (!particles) return
    
    const particlesCount = 100
    const colors = ['#0ea5e9', '#d946ef', '#6366f1']
    
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div')
      
      // Random position, size and color
      gsap.set(particle, {
        x: gsap.utils.random(0, particles.offsetWidth),
        y: gsap.utils.random(0, particles.offsetHeight),
        width: gsap.utils.random(2, 6),
        height: gsap.utils.random(2, 6),
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: '50%',
        position: 'absolute',
        opacity: gsap.utils.random(0.1, 0.6)
      })
      
      particles.appendChild(particle)
      
      // Animate each particle
      gsap.to(particle, {
        x: `+=${gsap.utils.random(-100, 100)}`,
        y: `+=${gsap.utils.random(-100, 100)}`,
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
    
    return () => {
      while (particles.firstChild) {
        particles.removeChild(particles.firstChild)
      }
    }
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  }
  
  const socialVariants = {
    hidden: { scale: 0 },
    visible: i => ({
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.2 + (i * 0.1) 
      }
    })
  }
  
  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 1.8,
        duration: 0.6
      }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: 2.2
      }
    }
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center">
      {/* Particles container */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none"
      />
      
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-4 py-1 rounded-full text-sm font-medium">
            Hello, I'm a
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400"
        >
          Frontend Developer
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
        >
          Building beautiful, interactive experiences
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400 max-w-lg mb-8 text-lg"
        >
          I craft responsive websites where technologies meet creativity. 
          When I'm not coding, you'll find me designing UI/UX or exploring new technologies.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </motion.div>
        
        <motion.div className="flex space-x-4">
          {[
            { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
            { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: <Mail size={20} />, href: "mailto:hello@example.com", label: "Email" }
          ].map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-soft hover:shadow-soft-lg hover:scale-110 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              custom={i}
              variants={socialVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={["visible", "bounce"]}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
        <ArrowDown size={20} className="text-primary-500 animate-bounce" />
      </motion.div>
    </div>
  )
}
