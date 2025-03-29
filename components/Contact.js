
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, formData)
      
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  }

  const inputVariants = {
    focus: { scale: 1.01, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }
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
        Get In Touch
      </motion.h2>
      <motion.p variants={itemVariants} className="section-subtitle text-center mx-auto">
        Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Contact info cards */}
        {[
          { 
            icon: <Mail size={24} />, 
            title: "Email", 
            content: "hello@example.com",
            link: "mailto:hello@example.com" 
          },
          { 
            icon: <MapPin size={24} />, 
            title: "Location", 
            content: "San Francisco, CA",
            link: "https://maps.google.com" 
          },
          { 
            icon: <Phone size={24} />, 
            title: "Phone", 
            content: "+1 (123) 456-7890",
            link: "tel:+11234567890" 
          }
        ].map((item, i) => (
          <motion.a
            key={item.title}
            href={item.link}
            target={item.title === "Location" ? "_blank" : undefined}
            rel={item.title === "Location" ? "noopener noreferrer" : undefined}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="card p-6 text-center hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
          </motion.a>
        ))}
      </div>

      {/* Contact form */}
      <motion.div
        variants={formVariants}
        className="mt-16 card p-6 md:p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div whileFocus="focus" variants={inputVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>
            
            <motion.div whileFocus="focus" variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>
          </div>
          
          <motion.div className="mb-6" whileFocus="focus" variants={inputVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </motion.div>
          
          <motion.div className="mb-6" whileFocus="focus" variants={inputVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full md:w-auto flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
