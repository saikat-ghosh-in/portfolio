import { Link } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";
import projects from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Projects() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <SectionWrapper id="projects" className="py-12">
      <div className="py-12 relative">
        <div className="absolute right-0 top-0 h-full w-1" style={{ backgroundColor: "var(--color-accent)" }} />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-14 text-right">
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem" }}>
              Featured Projects <span style={{ color: "var(--color-accent)" }}>/</span>
            </h2>
            <div className="section-divider ml-auto mt-4" />
          </div>

          {/* Cards */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div variants={itemVariants} key={project.id || project.title} className="card group relative flex flex-col overflow-hidden">
                {isDark && <div className="absolute -inset-2 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundColor: "var(--color-accent)" }} />}

                {/* Badges */}
                <div className="absolute top-5 right-5 flex gap-2 z-10">
                  {project.featured && <span className="badge">{isDark ? "★" : ""} Featured</span>}
                  {project.status && (
                    <span className="text-xs font-semibold px-2.5 py-1 inline-flex items-center justify-center leading-none" style={{
                      backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
                      color: isDark ? "#4ade80" : "#16a34a",
                      borderRadius: isDark ? 0 : "9999px",
                      border: isDark ? "1px solid rgba(34,197,94,0.3)" : "none",
                    }}>{project.status}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7 mt-3">
                  <h3 className="mb-1 pr-24 text-xl font-bold" style={{ color: "var(--color-text-heading)" }}>{project.title}</h3>
                  {project.tagline && <p className="mb-4 text-sm font-medium" style={{ color: "var(--color-accent)" }}>{project.tagline}</p>}
                  <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>{project.summary}</p>

                  {/* Tech */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-5" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <Link to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn-primary text-sm">Read More</Link>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline group text-sm">
                      Live Demo
                      <div className="ml-1 transition-all duration-300">
                        <svg className="h-4 w-4 shrink-0 transition-colors duration-300 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline group text-sm">
                        GitHub
                        <div className="ml-1 transition-all duration-300">
                          <svg className="h-4 w-4 shrink-0 transition-colors duration-300 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
