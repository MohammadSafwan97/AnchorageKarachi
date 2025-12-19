import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
 {
  title: "Django Restaurant Management System",
  description:
  "Django restaurant system with authentication, menu browsing, cart and checkout, table reservations, and user-specific order history, built with server-rendered views and Tailwind CSS.",

  image:
    "https://images.unsplash.com/photo-1722739541715-1d59cde9cca4?fm=jpg&q=80&w=1080",
  tech: ["Django", "Python", "SQLite", "Tailwind CSS"],
  github: "https://github.com/MohammadSafwan97/Django-Restraunt-App",
  demo: "https://django-restraunt-app.onrender.com/",
  actions: { code: true, demo: true },
}
,

 {
  title: "Medical Knowledge Retrieval System (RAG-Based)",
  description:
    "End-to-end medical document question-answering system built using Retrieval-Augmented Generation (RAG). The system extracts and preprocesses text from PDF-based medical books, generates embeddings, and stores them in a vector database for semantic search. A LangChain-powered RAG pipeline with OpenAI is used to produce grounded, context-aware responses via a Flask-based backend and chatbot interface. The system runs smoothly in an offline/local environment and is planned for production deployment; deployment is currently pending.",
  image:
    "https://images.unsplash.com/photo-1659018966820-de07c94e0d01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGNoYXRib3R8ZW58MHx8MHx8fDA%3D",
  tech: [
    "Python",
    "Flask",
    "LangChain",
    "OpenAI API",
    "Vector Databases",
    "RAG"
  ],
  github: "https://github.com/MohammadSafwan97/medical-rag-llm-langchain-pinecone-flask-aws",
  demo: "",
  actions: { code: true, demo: false },
}
,
  {
    title: "Restaurant AI Ordering Assistant",
    description:
      "Conversational AI assistant that enables customers to browse menus, check prices, place orders, and ask questions using natural language with AI-driven responses and structured business logic.",
    image: "https://plus.unsplash.com/premium_photo-1758204526484-8aab4982f214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMHJvYm90fGVufDB8fDB8fHww",
    tech: ["LangChain", "OpenAI API", "Flask", "TailwindCSS"],
    github: "https://github.com/MohammadSafwan97/Restaurant-Ai-Assistant",
    demo: "https://chatbot-coral-omega.vercel.app/ ",
    actions: { code: true, demo: true },
  },
  {
    title: "Jarvis Voice AI Assistant",
    description:
      "Voice-enabled AI assistant supporting natural language understanding, task automation, API integrations, and speech-based interaction.",
    image:
      "https://images.unsplash.com/photo-1562851529-c370841f6536?fm=jpg&q=80&w=1080",
    tech: ["Python", "Speech Recognition", "NLP", "APIs"],
    github: "https://github.com/MohammadSafwan97/JarvisAI",
    demo: "",
    actions: { code: true, demo: false },
  },
  {
    title: "Full-Stack E-Commerce Platform with AI Chatbot",
    description:
      "Production-ready e-commerce platform with secure authentication, Stripe payments, product management, and an AI-powered chatbot for customer support.",
    image:
      "https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww",
    tech: ["React", "Node.js", "Flask", "OpenAI API", "Langchain"],
    github: "https://github.com/MohammadSafwan97/fullstack-react-ecommerce",
    demo: "https://fullstack-react-ecommerce-2spl.vercel.app/",
    actions: { code: true, demo: true },
  },
];

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<any | null>(null);

  return (
    <section id="projects" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-3xl mx-auto">
            Real-world applications demonstrating full-stack and AI engineering expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <div className="h-full flex flex-col bg-[#1A2B4A] rounded-2xl border-4 border-white/20 overflow-hidden hover:border-[#00E5FF] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h4 className="mb-3">{project.title}</h4>
                  <p className="text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-xs text-[#00E5FF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-[#0F172A] rounded-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X />
              </button>

              <ImageWithFallback
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-56 object-cover rounded-xl mb-6"
              />

              <h3 className="mb-3">{activeProject.title}</h3>
              <p className="text-sm mb-6 text-justify">
                {activeProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-xs text-[#00E5FF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {activeProject.actions.code && (
                  <a
                    href={activeProject.github}
                    className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl"
                  >
                    <Github size={16} />
                    <span className="text-sm">View Code</span>
                  </a>
                )}
                {activeProject.actions.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] rounded-xl"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">View Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
