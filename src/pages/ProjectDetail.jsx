import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { title } = useParams();
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const project = projects.find((p) => p.title.toLowerCase().replace(/\s+/g, '-') === title);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        <h2 className="text-2xl font-bold" style={{ color: "var(--color-text-heading)" }}>Project not found</h2>
        <Link to="/" className="mt-4 hover:underline" style={{ color: "var(--color-accent)" }}>Return to Portfolio</Link>
      </div>
    );
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };



  return (
    <>
      <div className="min-h-screen pt-28 pb-0">

        {/* HERO SECTION */}
        <section className="glass-section relative px-6 py-12 md:py-24 mx-auto max-w-7xl overflow-hidden">

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
            <motion.div variants={fadeUp}>
              <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-[var(--color-accent)]" style={{ color: "var(--color-text-muted)" }}>
                <FiArrowLeft className="h-4 w-4" /> Back to Portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
              {project.featured && <span className="badge px-4 py-1.5 text-xs tracking-wider uppercase" style={{ borderRadius: "9999px" }}>Featured</span>}
              {project.status && (
                <span className="inline-flex items-center justify-center leading-none text-xs font-bold tracking-wider uppercase px-4 py-1.5" style={{
                  backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)",
                  color: isDark ? "#4ade80" : "#16a34a",
                  borderRadius: "9999px",
                }}>{project.status}</span>
              )}
            </motion.div>

            <div className="flex flex-wrap items-center gap-6 md:gap-12 mb-6">
              <motion.h1
                variants={fadeUp}
                className="font-display font-black leading-none"
                style={{ fontSize: "clamp(3rem, 10vw, 8rem)", color: "var(--color-text-heading)", textTransform: "uppercase", letterSpacing: "-0.02em" }}
              >
                {project.title}
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="max-w-2xl text-xl md:text-3xl font-light leading-relaxed mb-12" style={{ color: "var(--color-text-body)" }}>
              {project.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden w-full sm:w-auto"
                  style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-primary)" }}
                >
                  <span className="relative z-10 font-bold uppercase tracking-widest text-sm">Visit Live Demo</span>
                  <FiExternalLink className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" style={{ backgroundColor: "var(--color-accent)" }} />
                </a>
              )}

              {project.githubUrl && project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full w-full sm:w-auto transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  style={{ border: `2px solid var(--color-border)`, color: "var(--color-text-heading)" }}
                >
                  <span className="font-bold uppercase tracking-widest text-sm">View Source Code</span>
                  <FiGithub className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </section>



        {/* THE CHALLENGE & SOLUTION (OR FALLBACK TO GENERIC DESCRIPTION) */}
        <section className="glass-section px-6 py-24 md:py-40 mx-auto max-w-7xl">
          {project.challenge || project.solution ? (
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {project.challenge && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "var(--color-accent)" }}>The Challenge</h3>
                  <p className="text-2xl md:text-4xl font-medium leading-tight" style={{ color: "var(--color-text-heading)" }}>
                    {project.challenge}
                  </p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "var(--color-accent)" }}>The Solution</h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                    {project.solution}
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-4xl mx-auto">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "var(--color-accent)" }}>Overview</h3>
              <p className="text-2xl md:text-4xl font-medium leading-tight mb-8" style={{ color: "var(--color-text-heading)" }}>
                {project.description}
              </p>
            </motion.div>
          )}
        </section>

        {/* CORE MODULES (OR FALLBACK HIGHLIGHTS) */}
        {(project.modules?.length > 0 || project.highlights?.length > 0) && (
          <section className="glass-section py-24 md:py-40 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="px-6 mx-auto max-w-7xl">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 md:mb-32">
                <h2 className="font-display font-black text-4xl md:text-7xl uppercase mb-6" style={{ color: "var(--color-text-heading)" }}>
                  {project.modules ? "Core Modules" : "Key Highlights"}
                </h2>
                <div className="w-24 h-2" style={{ backgroundColor: "var(--color-accent)" }} />
              </motion.div>

              {project.modules ? (
                <div className="space-y-12 sm:space-y-16">
                  {project.modules.map((mod, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}>
                          <FiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mt-3" style={{ color: "var(--color-text-heading)" }}>{mod.title}</h3>
                          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--color-text-body)" }}>{mod.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {project.highlights.map((h, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="p-8 md:p-12 rounded-3xl"
                      style={{ backgroundColor: isDark ? "#0c0c14" : "#ffffff", border: `1px solid var(--color-border)` }}
                    >
                      <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-heading)" }}>{h.heading}</h3>
                      <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-body)" }}>{h.detail}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TECHNICAL ARCHITECTURE */}
        {(project.techFrontend || project.techBackend || project.tech) && (
          <section className="glass-section px-6 py-24 md:py-40 mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase mb-6" style={{ color: "var(--color-text-heading)" }}>Technical Stack</h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>Purpose-built using modern frameworks to ensure scale, security, and maintainability.</p>
            </motion.div>

            {project.techFrontend || project.techBackend ? (
              <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                {project.techFrontend && (
                  <motion.div
                    initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="p-10 md:p-16 rounded-3xl" style={{ backgroundColor: "var(--color-bg-surface)", border: `1px solid var(--color-border)` }}
                  >
                    <h3 className="text-2xl font-bold uppercase tracking-widest mb-10" style={{ color: "var(--color-accent)" }}>Frontend</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.techFrontend.map(t => (
                        <span key={t} className="px-5 py-3 rounded-full text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-heading)", border: `1px solid var(--color-border)` }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {project.techBackend && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="p-10 md:p-16 rounded-3xl" style={{ backgroundColor: "var(--color-bg-surface)", border: `1px solid var(--color-border)` }}
                  >
                    <h3 className="text-2xl font-bold uppercase tracking-widest mb-10" style={{ color: "var(--color-accent)" }}>Backend & Infra</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.techBackend.map(t => (
                        <span key={t} className="px-5 py-3 rounded-full text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-heading)", border: `1px solid var(--color-border)` }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto p-10 md:p-16 rounded-3xl text-center" style={{ backgroundColor: "var(--color-bg-surface)", border: `1px solid var(--color-border)` }}
              >
                <div className="flex flex-wrap justify-center gap-3">
                  {project.tech.map(t => (
                    <span key={t} className="px-5 py-3 rounded-full text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-heading)", border: `1px solid var(--color-border)` }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </section>
        )}

      </div>
    </>
  );
}
