
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Dialog } from '@headlessui/react'
import { ExternalLink, Github, X, Code, Eye, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-css'

// Project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js and a headless CMS. Features include product filtering, cart functionality, and secure checkout.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js", "TailwindCSS", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    codeSnippet: `// Product card component with hover effects
export default function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">\${product.price}</p>
      </div>
    </div>
  );
}`
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects. Features include drag-and-drop organization, task categorization, and progress tracking.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    codeSnippet: `// Drag and drop functionality for task cards
import { useDrag, useDrop } from 'react-dnd';

function TaskCard({ task, index, moveTask }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}`
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "A comprehensive dashboard for managing social media accounts and tracking engagement metrics across platforms.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js", "TailwindCSS", "Chart.js", "API Integration"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    codeSnippet: `// Chart component for analytics visualization
import { Line } from 'react-chartjs-2';

export default function EngagementChart({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Likes',
        data: data.map(d => d.likes),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
      },
      {
        label: 'Comments',
        data: data.map(d => d.comments),
        borderColor: '#d946ef',
        backgroundColor: 'rgba(217, 70, 239, 0.1)',
        fill: true,
      },
    ],
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Engagement Metrics</h3>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
}`
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An AI-powered application that generates marketing copy, blog posts, and social media content based on user inputs and preferences.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    codeSnippet: `// AI content generation function
async function generateContent(prompt, options) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        maxTokens: options.length,
        temperature: options.creativity,
        tone: options.tone,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.generatedText;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}`
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Syntax highlighting
  useState(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [selectedProject])

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
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
        My Projects
      </motion.h2>
      <motion.p variants={itemVariants} className="section-subtitle text-center mx-auto">
        A selection of my recent work showcasing my skills and passion for web development
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"
            className="card overflow-hidden group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-60 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <p className="font-medium">View Project</p>
                  <ArrowRight className="mt-2" size={20} />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog
            as={motion.div}
            static
            open={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.2 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 z-10"
              >
                <X size={20} />
              </button>

              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
                  <div className="p-6 md:p-8 w-full">
                    <Dialog.Title className="text-2xl md:text-3xl font-bold text-white">
                      {selectedProject.title}
                    </Dialog.Title>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <Dialog.Description className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </Dialog.Description>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <Code size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
                    Code Snippet
                  </h4>
                  <div className="relative rounded-lg overflow-hidden">
                    <pre className="language-jsx line-numbers">
                      <code className="language-jsx">
                        {selectedProject.codeSnippet}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary flex items-center"
                  >
                    <Eye size={18} className="mr-2" />
                    Live Demo
                  </a>
                  <a 
                    href={selectedProject.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary flex items-center"
                  >
                    <Github size={18} className="mr-2" />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="mt-12 text-center">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          View more projects on GitHub
          <ExternalLink size={18} className="ml-2" />
        </a>
      </motion.div>
    </motion.div>
  )
}
