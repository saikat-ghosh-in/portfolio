import { Link } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";
import projects from "../data/projects";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-20" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Projects</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            Things I've built.
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id || project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-colors sm:p-8 no-underline block"
                style={{
                  backgroundColor: "var(--color-bg-surface-sunken)",
                  borderColor: "var(--color-border)",
                  color: "inherit"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-bg-surface-alt)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--color-bg-surface-sunken)"}
              >
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.status === "Live" ? "#22c55e" : "var(--color-text-muted)" }} />
                        {project.status}
                      </span>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center justify-center h-8 w-8 rounded-full transition-colors"
                          style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}
                          title="Source Code"
                        >
                          <FiGithub className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center justify-center h-8 w-8 rounded-full transition-colors"
                          style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}
                          title="Live Demo"
                        >
                          <FiExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-medium tracking-tight" style={{ color: "var(--color-text-heading)" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm line-clamp-3 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {project.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
