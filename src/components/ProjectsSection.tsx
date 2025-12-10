import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "Full-Stack E-Commerce Platform + AI Chatbot",
    description:
      "Modern e-commerce solution with intelligent customer support chatbot, real-time inventory, and secure payment processing.",
    image:
      "https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMGFwcHxlbnwxfHx8fDE3NjUyNzg5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Stripe"],
    github: "#",
    demo : "https://fullstack-react-ecommerce-3wt6.vercel.app",

  },
  {
    title: "Medical RAG Chatbot",
    description:
      "Advanced medical assistant using Retrieval-Augmented Generation for accurate health information and symptom analysis.",
    image:
      "https://images.unsplash.com/photo-1758202292826-c40e172eed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGFpfGVufDF8fHx8MTc2NTI4MzUyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["Python", "LangChain", "Pinecone", "Flask", "RAG"],
    github: "#",
    demo: "#",
  },
  {
    title: "AI Tools Collection",
    description:
      "Comprehensive suite of AI-powered tools for image generation, audio processing, and text analysis with intuitive interfaces.",
    image:
      "https://images.unsplash.com/photo-1763568258235-f40425a94af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdG9vbHN8ZW58MXx8fHwxNzY1MzA0MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["Next.js", "OpenAI", "Stable Diffusion", "Whisper", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    title: "Jarvis Voice AI Assistant",
    description:
      "Intelligent voice-activated assistant with natural language processing, task automation, and smart home integration.",
    image:
      "https://images.unsplash.com/photo-1562851529-c370841f6536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2ljZSUyMGFzc2lzdGFudCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY1MzY2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["Python", "Speech Recognition", "NLP", "IoT", "API Integration"],
    github: "#",
    demo: "#",
  },
  {
    title: "Discussion Forum Platform",
    description:
      "Full-featured community forum with real-time discussions, user authentication, moderation tools, and rich text editing.",
    image:
      "https://images.unsplash.com/photo-1760992003923-ed5d455c1164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjdXNzaW9uJTIwZm9ydW0lMjBjb21tdW5pdHl8ZW58MXx8fHwxNzY1MzYyMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io", "JWT"],
    github: "#",
    demo: "#",
  },
  {
    title: "Django Restaurant App",
    description:
      "Modern restaurant management system with online ordering, table reservations, menu management, and customer reviews.",
    image:
      "https://images.unsplash.com/photo-1722739541715-1d59cde9cca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2NTM2MjA0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["Django", "Python", "SQLite", "Bootstrap", "REST API"],
    github: "#",
    demo: "#",
  },
  {
    title: "Car Dealer App",
    description:
      "Full-stack automotive marketplace with advanced search, virtual showroom, financing calculator, and dealer management.",
    image:
      "https://images.unsplash.com/photo-1605801936998-a39a1518b03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2NTI4NzA4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["React", "Django REST", "PostgreSQL", "AWS S3", "Redux"],
    github: "#",
    demo: "#",
  },
];

export function ProjectsSection() {
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
            Showcasing innovative solutions built with modern technologies
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
              className="group"
            >
              {/* Neobrutalist Card */}
              <div className="relative bg-[#1A2B4A] rounded-2xl border-4 border-white/20 overflow-hidden hover:border-[#00E5FF] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4A] to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="mb-3 group-hover:text-[#00E5FF] transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-xs text-[#00E5FF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-strong rounded-xl hover:bg-white/10 transition-all group/btn"
                    >
                      <Github
                        size={16}
                        className="group-hover/btn:text-[#00E5FF] transition-colors"
                      />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] rounded-xl hover:shadow-lg transition-all group/btn"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
