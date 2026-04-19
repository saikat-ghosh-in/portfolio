import SectionWrapper from "../components/SectionWrapper";
import experience from "../data/experience";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import capgeminiLogo from "../assets/Capgemini_Logo.png";
import capgeminiTag from "../assets/Capgemini.png";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.25 } } };
const roleVariants = { hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Experience() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [expandedState, setExpandedState] = useState(
    experience.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
  );

  const toggleExpand = (id) => {
    setExpandedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SectionWrapper id="experience" className="py-12">
      <div className="glass-section py-12 relative overflow-hidden">
        {isDark && <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: "var(--color-accent)" }} />}
        
        {/* Subtle background decoration */}
        {isDark && <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)] opacity-[0.03] blur-3xl pointer-events-none rounded-full" />}
        {!isDark && <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)] opacity-[0.05] blur-3xl pointer-events-none rounded-full" />}

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Header */}
          <div className={`mb-16 ${isDark ? "text-left" : "text-center"}`}>
            {!isDark && <p className="section-label">Career Journey</p>}
            <h2 className="section-title" style={isDark ? { display: "flex", alignItems: "center", gap: "1rem" } : {}}>
              {isDark && <span style={{ color: "var(--color-accent)" }}>/</span>}
              Work Experience
            </h2>
            {!isDark && <div className="section-divider mx-auto" />}
            {isDark && <div className="section-divider mt-4" />}
          </div>

          <div className="space-y-16">
            {experience.map((companyData) => (
              <div key={companyData.id} className="relative">
                
                {/* Company Header */}
                <div 
                  className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 cursor-pointer group" 
                  style={{ borderColor: "var(--color-border)" }}
                  onClick={() => toggleExpand(companyData.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden" style={{ 
                      backgroundColor: "var(--color-accent-soft)", 
                      borderRadius: "var(--radius-button)",
                      border: isDark ? "1px solid var(--color-accent)" : "none",
                      boxShadow: isDark ? "0 0 15px var(--color-accent-glow)" : "none"
                    }}>
                      {companyData.company.includes("Capgemini") 
                        ? <img src={capgeminiLogo} alt="Capgemini Logo" className="h-full w-full object-contain p-1 bg-white" />
                        : <span className="font-bold text-xl text-[var(--color-accent)]">{companyData.company.charAt(0)}</span>
                      }
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: "var(--color-text-heading)" }}>{companyData.company}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>{companyData.location}</p>
                    </div>
                  </div>
                  <div 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer group-hover:bg-[var(--color-bg-surface-alt)]"
                    aria-label={expandedState[companyData.id] ? "Collapse details" : "Expand details"}
                  >
                    <svg
                      className={`h-6 w-6 transition-transform duration-300 ${expandedState[companyData.id] ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      style={{ color: "var(--color-text-heading)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Timeline for Roles */}
                <AnimatePresence initial={false}>
                  {expandedState[companyData.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative ml-4 md:ml-10 pt-2 pb-4">
                        <div className="absolute left-0 top-3 h-[calc(100%-1rem)] w-[2px]" style={{
                          background: isDark
                            ? "linear-gradient(to bottom, var(--color-accent), transparent)"
                            : "linear-gradient(to bottom, var(--color-accent), var(--color-border))",
                          boxShadow: isDark ? "0 0 8px var(--color-accent-glow)" : "none",
                        }} />

                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-10">
                          {companyData.roles.map((role, idx) => (
                            <motion.div variants={roleVariants} key={idx} className="relative pl-8 md:pl-12">
                              {/* Dot */}
                              <div className="absolute left-[-6px] top-2 flex h-3.5 w-3.5 items-center justify-center transition-all duration-300 hover:scale-150" style={{
                                backgroundColor: "var(--color-bg-primary)",
                                border: `3px solid var(--color-accent)`,
                                borderRadius: "var(--radius-pill)",
                                boxShadow: isDark 
                                  ? "0 0 0 4px var(--color-bg-surface), 0 0 10px var(--color-accent-glow)" 
                                  : "0 0 0 4px var(--color-bg-surface)",
                              }} />

                              {/* Card */}
                              <div className="card p-6 sm:p-8 group relative overflow-hidden">
                                {isDark && <div className="absolute -inset-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundColor: "var(--color-accent)" }} />}
                                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                                  <div>
                                    <h4 className="text-xl font-bold" style={{ color: "var(--color-text-heading)" }}>{role.title}</h4>
                                    <p className="mt-1 text-sm font-semibold" style={{ color: "var(--color-accent)" }}>{role.period}</p>
                                  </div>
                                  {companyData.company.includes("Capgemini") 
                                    ? <div className="h-6 mt-1 flex-shrink-0"><img src={capgeminiTag} alt="Capgemini Tag" className="h-full w-auto object-contain bg-white rounded-sm px-1 py-0.5" /></div>
                                    : <span className="badge mt-1">{companyData.company.split(" ")[0]}</span>
                                  }
                                </div>

                                {role.summary && <p className="mb-5 text-sm italic leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{role.summary}</p>}

                                <ul className="space-y-3">
                                  {role.bullets.map((point, j) => (
                                    <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                                      <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0" style={{
                                        backgroundColor: "var(--color-accent)",
                                        borderRadius: "var(--radius-pill)",
                                      }} />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>

                                {role.tags?.length > 0 && (
                                  <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
                                    {role.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
