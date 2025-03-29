
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Download, Coffee, Code, BookOpen } from 'lucide-react'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
      transition: { duration: 0.5 }
    }
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  }

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.6 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full"
    >
      <motion.h2 variants={itemVariants} className="section-title text-center">
        About Me
      </motion.h2>
      <motion.p variants={itemVariants} className="section-subtitle text-center mx-auto">
        Get to know more about my background, experience, and what drives me as a developer
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        {/* Image */}
        <motion.div 
          variants={imageVariants}
          className="relative mx-auto md:mx-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Developer portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full z-[-1]"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.div 
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-100 dark:bg-secondary-900/30 rounded-full z-[-1]"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </motion.div>

        {/* Bio */}
        <div>
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Frontend Developer & UI/UX Enthusiast
          </motion.h3>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 mb-4"
          >
            I'm a passionate frontend developer with a strong foundation in creating responsive, 
            user-friendly web applications. With 5+ years of experience, I specialize in building 
            performant React applications that deliver exceptional user experiences.
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 mb-6"
          >
            My journey in web development began with a curiosity about how things work on the web. 
            That curiosity evolved into a passion for crafting intuitive interfaces and solving 
            complex problems with clean, maintainable code. I'm constantly learning and exploring 
            new technologies to stay at the forefront of web development.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <a 
              href="/resume.pdf" 
              className="btn-primary inline-flex items-center"
              download
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </a>
          </motion.div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Coffee size={24} />, value: "500+", label: "Cups of Coffee" },
              { icon: <Code size={24} />, value: "50+", label: "Projects Completed" },
              { icon: <BookOpen size={24} />, value: "5+", label: "Years Experience" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statsVariants}
                className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-soft"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
