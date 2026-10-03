import { Link } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";
import projects from "../data/projects";
import { motion } from "framer-motion";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-20">
      <div className="py-12 relative">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Featured Work</h2>
          </div>

          {/* Cards */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-8">
            {projects.map((project) => (
              <motion.div variants={itemVariants} key={project.id || project.title} className="card group relative flex flex-col overflow-hidden">

                {/* Badges */}
                <div className="absolute top-6 right-6 flex gap-2 z-10">
                  {project.featured && <span className="badge shimmer-badge">Featured</span>}
                  {project.status && (
                    <span className="text-xs font-medium px-3 py-1" style={{
                      backgroundColor: "rgba(48,209,88,0.12)",
                      color: "#30d158",
                      borderRadius: "var(--radius-pill)",
                    }}>{project.status}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-8 mt-2">
                  <h3 className="mb-1 pr-28 text-2xl font-semibold" style={{ color: "var(--color-text-heading)", letterSpacing: "-0.02em" }}>{project.title}</h3>
                  {project.tagline && <p className="mb-5 text-sm font-medium" style={{ color: "var(--color-accent)" }}>{project.tagline}</p>}
                  <p className="mb-8 flex-1 text-base leading-relaxed max-w-2xl" style={{ color: "var(--color-text-body)" }}>{project.summary}</p>

                  {/* Tech */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <Link to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn-primary text-sm">
                      Read More
                    </Link>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm group/link">
                      Live Demo
                      <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm group/link">
                        Source
                        <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
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
