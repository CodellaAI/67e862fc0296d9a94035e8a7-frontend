
'use client'

import { motion } from 'framer-motion'
import { Code } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Code size={64} className="text-primary-600 dark:text-primary-400" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Code size={64} className="text-secondary-500" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-8"
      />
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-600 dark:text-gray-400 font-medium"
      >
        Loading Portfolio...
      </motion.p>
    </div>
  )
}
