
'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <motion.a 
            href="#home"
            className="flex items-center font-bold text-xl text-gray-900 dark:text-white mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary-600 dark:text-primary-400 mr-1">&lt;</span>
            Dev
            <span className="text-secondary-600 dark:text-secondary-400">Portfolio</span>
            <span className="text-primary-600 dark:text-primary-400 ml-1">/&gt;</span>
          </motion.a>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-lg">
            Building innovative web experiences with clean code and thoughtful design.
            Let's create something amazing together.
          </p>
          
          <div className="flex space-x-6 mb-8">
            {[
              { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
              { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
              { icon: <Mail size={20} />, href: "mailto:hello@example.com", label: "Email" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Dev Portfolio. All rights reserved.
            </p>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <span>Made with</span>
              <Heart size={14} className="mx-1 text-red-500 animate-pulse" />
              <span>using Next.js & TailwindCSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
