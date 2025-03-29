
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Skill categories and items
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90, icon: "📱" },
      { name: "Next.js", level: 85, icon: "🔄" },
      { name: "JavaScript", level: 95, icon: "🟨" },
      { name: "TypeScript", level: 80, icon: "🔷" },
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "Tailwind", level: 85, icon: "💨" },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Express", level: 80, icon: "🚂" },
      { name: "MongoDB", level: 75, icon: "🍃" },
      { name: "GraphQL", level: 70, icon: "◼️" },
      { name: "REST API", level: 85, icon: "🔌" },
    ]
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 90, icon: "🔄" },
      { name: "Webpack", level: 75, icon: "📦" },
      { name: "Docker", level: 65, icon: "🐳" },
      { name: "Figma", level: 80, icon: "🎨" },
      { name: "VS Code", level: 95, icon: "💻" },
    ]
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Animation variants
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: level => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut" }
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
        My Skills
      </motion.h2>
      <motion.p variants={itemVariants} className="section-subtitle text-center mx-auto">
        A showcase of my technical expertise and tools I work with daily
      </motion.p>

      {/* Category tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
        {skillCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.name
                ? "bg-primary-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Skills display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skill bars */}
        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          {skillCategories
            .find(category => category.name === activeCategory)
            .skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                custom={index}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    variants={skillBarVariants}
                    custom={skill.level}
                  />
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Skill radar/chart visualization */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center p-4"
        >
          <div className="relative w-64 h-64">
            {/* Radar background circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-gray-200 dark:border-gray-700"
                style={{
                  top: `${50 - 50 * scale}%`,
                  left: `${50 - 50 * scale}%`,
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  opacity: 0.5
                }}
              />
            ))}

            {/* Skill points */}
            {skillCategories
              .find(category => category.name === activeCategory)
              .skills.map((skill, index) => {
                const angle = (index * 2 * Math.PI) / skillCategories.find(
                  category => category.name === activeCategory
                ).skills.length
                const radius = (skill.level / 100) * 32 // 32 is half of the container (64px)
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      x: 32 + x,
                      y: 32 + y
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 * index
                    }}
                    className="absolute w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-xs text-white transform -translate-x-3 -translate-y-3 shadow-md"
                    title={`${skill.name}: ${skill.level}%`}
                  >
                    {skill.icon}
                  </motion.div>
                )
              })}

            {/* Connect lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: -1 }}
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                d={skillCategories
                  .find(category => category.name === activeCategory)
                  .skills.map((skill, index) => {
                    const angle = (index * 2 * Math.PI) / skillCategories.find(
                      category => category.name === activeCategory
                    ).skills.length
                    const radius = (skill.level / 100) * 32
                    const x = 32 + Math.cos(angle) * radius
                    const y = 32 + Math.sin(angle) * radius
                    return `${index === 0 ? "M" : "L"} ${x} ${y}`
                  })
                  .join(" ") + " Z"}
                stroke="url(#skillGradient)"
                strokeWidth="2"
                fill="rgba(14, 165, 233, 0.1)"
              />
              <defs>
                <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
