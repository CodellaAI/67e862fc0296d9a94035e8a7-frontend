
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { Disclosure, Transition } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navbarClasses = `fixed w-full z-30 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2' 
      : 'bg-transparent py-4'
  }`

  return (
    <Disclosure as="nav" className={navbarClasses}>
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <motion.a 
                  href="#home"
                  className="flex items-center font-bold text-xl text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-primary-600 dark:text-primary-400 mr-1">&lt;</span>
                  Dev
                  <span className="text-secondary-600 dark:text-secondary-400">Portfolio</span>
                  <span className="text-primary-600 dark:text-primary-400 ml-1">/&gt;</span>
                </motion.a>
              </div>
              
              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="hidden md:flex space-x-6">
                  {navigation.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 py-1 text-sm font-medium transition-colors duration-200 relative group"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                    </motion.a>
                  ))}
                </div>
                
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                  aria-label="Toggle theme"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mounted && (
                    theme === 'dark' ? (
                      <Sun size={20} />
                    ) : (
                      <Moon size={20} />
                    )
                  )}
                </motion.button>
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                  aria-label="Toggle theme"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mounted && (
                    theme === 'dark' ? (
                      <Sun size={18} />
                    ) : (
                      <Moon size={18} />
                    )
                  )}
                </motion.button>
                
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
