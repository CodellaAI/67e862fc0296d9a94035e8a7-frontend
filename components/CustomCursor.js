
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)

    // Only add event listeners if not on mobile
    if (!isMobile) {
      const mouseMove = e => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        })
      }

      // Add hover listeners to clickable elements
      const addHoverListeners = () => {
        const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]')
        
        clickables.forEach(el => {
          el.addEventListener('mouseenter', () => setCursorVariant('hover'))
          el.addEventListener('mouseleave', () => setCursorVariant('default'))
        })
      }

      window.addEventListener('mousemove', mouseMove)
      
      // Wait for DOM to be fully loaded
      if (document.readyState === 'complete') {
        addHoverListeners()
      } else {
        window.addEventListener('load', addHoverListeners)
      }

      return () => {
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('resize', checkDevice)
        window.removeEventListener('load', addHoverListeners)
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) return null

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(14, 165, 233, 0.2)',
      border: '1px solid rgba(14, 165, 233, 0.5)',
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 25
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(14, 165, 233, 0.4)',
      border: '1px solid rgba(14, 165, 233, 0.7)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 400,
        damping: 25
      }
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
      variants={variants}
      animate={cursorVariant}
    />
  )
}
