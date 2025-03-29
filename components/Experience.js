
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

// Experience data
const experiences = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    date: "2021 - Present",
    description: "Lead frontend development for enterprise SaaS platform. Implemented modern React architecture, improved performance by 40%, and mentored junior developers.",
    type: "work",
    skills: ["React", "Redux", "TypeScript", "GraphQL"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Solutions Agency",
    location: "New York, NY",
    date: "2018 - 2021",
    description: "Developed responsive web applications for clients across various industries. Collaborated with design and backend teams to deliver high-quality products on time.",
    type: "work",
    skills: ["JavaScript", "React", "CSS/SASS", "RESTful APIs"]
  },
  {
    id: 3,
    title: "Master's in Computer Science",
    company: "Tech University",
    location: "Boston, MA",
    date: "2016 - 2018",
    description: "Specialized in Human-Computer Interaction and Web Technologies. Thesis focused on improving web accessibility for users with visual impairments.",
    type: "education",
    skills: ["Research", "UI/UX", "Accessibility", "Web Standards"]
  },
  {
    id: 4,
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    location: "Austin, TX",
    date: "2015 - 2016",
    description: "Developed and maintained company website and client projects. Gained hands-on experience with modern web development practices and tools.",
    type: "work",
    skills: ["HTML/CSS", "JavaScript", "PHP", "WordPress"]
  },
  {
    id: 5,
    title: "Bachelor's in Information Technology",
    company: "State University",
    location: "Chicago, IL",
    date: "2011 - 2015",
    description: "Graduated with honors. Coursework included web development, database design, and software engineering principles.",
    type: "education",
    skills: ["Programming", "Database Design", "System Analysis", "Project Management"]
  }
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const timelineItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: i => ({
      x: 0,
      opacity: 1,
      transition: { 
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
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
        Experience & Education
      </motion.h2>
      <motion.p variants={itemVariants} className="section-subtitle text-center mx-auto">
        My professional journey and educational background
      </motion.p>

      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {experiences.map((experience, i) => (
            <motion.div
              key={experience.id}
              custom={i}
              variants={timelineItemVariants}
              className={`relative flex flex-col md:flex-row gap-8 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 transform -translate-x-1/2 z-10 flex items-center justify-center">
                {experience.type === 'work' ? (
                  <Briefcase size={14} className="text-primary-500" />
                ) : (
                  <GraduationCap size={14} className="text-primary-500" />
                )}
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <div className="card p-6 h-full">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                    experience.type === 'work' 
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                      : 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300'
                  }`}>
                    {experience.type === 'work' ? 'Work Experience' : 'Education'}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {experience.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                    {experience.type === 'work' ? (
                      <Briefcase size={16} className="mr-2" />
                    ) : (
                      <GraduationCap size={16} className="mr-2" />
                    )}
                    <span>{experience.company}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                    <MapPin size={16} className="mr-2" />
                    <span>{experience.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{experience.date}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {experience.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
