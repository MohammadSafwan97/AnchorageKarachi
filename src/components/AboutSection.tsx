import { motion } from 'framer-motion';
import { Code2, Database, Brain, Cloud, Laptop, Server } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: Laptop,
    items: ['React', 'Next.js', 'TailwindCSS', 'Bootstrap', 'TypeScript']
  },
  {
    category: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'Flask', 'Django', 'FastAPI']
  },
  {
    category: 'AI & LLM Systems',
    icon: Brain,
    items: ['LangChain', 'OpenAI API', 'Hugging Face', 'RAG', 'Vector Databases']
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'ChromaDB', 'Pinecone']
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    items: ['AWS', 'Vercel', 'Docker', 'Git', 'CI/CD']
  },
  {
    category: 'Languages',
    icon: Code2,
    items: ['JavaScript', 'Python', 'TypeScript', 'C++', 'SQL']
  }
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-[30px]">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="max-w-3xl mx-auto">
            Building production-ready software at the intersection of AI and full-stack engineering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 lg:p-12 mb-16 border-2 border-[#00E5FF]/20 hover:border-[#00E5FF]/40 transition-all duration-500"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-lg lg:text-xl leading-relaxed text-justify">
              Full Stack Engineer (AI Systems) with hands-on experience building
              <span className="text-[#00E5FF]"> end-to-end web applications</span>, 
              <span className="text-[#7B61FF]"> intelligent AI assistants</span>, and
              retrieval-augmented generation (RAG) pipelines. Skilled in React,
              Next.js, Node.js, Python, Flask, Django, LangChain, vector databases,
              and cloud deployment. Certified by{' '}
              <span className="text-[#00E5FF]">
                Meta, IBM, AWS, and Vanderbilt University via Coursera
              </span>.
            </p>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="rounded-2xl p-6 bg-white/10 border border-white/10">
                <div className="text-4xl font-semibold gradient-text mb-2">
                  4
                </div>
                <div className="text-lg  fond-semibold text-slate-200 ">
                  Featured Projects
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/10 border border-white/10">
                <div className="text-4xl font-semibold gradient-text mb-2">
                  4
                </div>
                <div className="text-lg  fond-semibold text-slate-200">
                  Professional Certifications
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/10 border border-white/10">
                <div className="text-4xl font-semibold gradient-text mb-2">
                  15+
                </div>
                <div className="text-lg  fond-semibold text-slate-200">
                  Core Technologies
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/10 border border-white/10">
                <div className="text-4xl font-semibold gradient-text mb-2">
                  3+
                </div>
                <div className="text-lg  fond-semibold text-slate-200">
                  Years of Hands-On Development
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div id="skills">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="mb-4">
              Technical <span className="gradient-text">Expertise</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B61FF] to-[#00E5FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <skillGroup.icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl">{skillGroup.category}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-sm border border-white/10 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
