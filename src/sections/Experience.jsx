import SectionWrapper from "../components/SectionWrapper";
import experience from "../data/experience";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import capgeminiLogo from "../assets/Capgemini_Logo.png";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const roleVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

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
    <SectionWrapper id="experience" className="py-20">
      <div className="py-12 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Experience</h2>
          </div>

          <div className="space-y-12">
            {experience.map((companyData) => (
              <div key={companyData.id} className="relative">
                
                {/* Company Header */}
                <div 
                  className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 cursor-pointer group" 
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                  onClick={() => toggleExpand(companyData.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ 
                      backgroundColor: "var(--color-bg-surface)",
                      border: "1px solid var(--color-border)",
                    }}>
                      {companyData.company.includes("Capgemini") 
                        ? <img src={capgeminiLogo} alt="Capgemini Logo" className="h-full w-full object-contain p-1 bg-white rounded-2xl" />
                        : <span className="font-semibold text-xl" style={{ color: "var(--color-accent)" }}>{companyData.company.charAt(0)}</span>
                      }
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: "var(--color-text-heading)" }}>{companyData.company}</h3>
                      <p className="mt-0.5 text-sm" style={{ color: "var(--color-text-muted)" }}>{companyData.location}</p>
                    </div>
                  </div>
                  <div 
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer active:scale-95 select-none touch-manipulation"
                    style={{ backgroundColor: "var(--color-accent-soft)" }}
                    aria-label={expandedState[companyData.id] ? "Collapse details" : "Expand details"}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)] ${expandedState[companyData.id] ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      style={{ color: "var(--color-accent)" }}
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
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-6 pl-4 md:pl-8 border-l-2" style={{ borderColor: "var(--color-border)" }}>
                        {companyData.roles.map((role, idx) => (
                          <motion.div variants={roleVariants} key={idx} className="relative pl-6">
                            {/* Dot */}
                            <div className="absolute left-[-9px] top-2 flex h-4 w-4 items-center justify-center" style={{
                              backgroundColor: "var(--color-bg-primary)",
                              border: `3px solid var(--color-accent)`,
                              borderRadius: "50%",
                            }} />

                            {/* Card */}
                            <div className="card p-6 sm:p-8">
                              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                                <div>
                                  <h4 className="text-lg font-semibold" style={{ color: "var(--color-text-heading)" }}>{role.title}</h4>
                                  <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--color-accent)" }}>{role.period}</p>
                                </div>
                              </div>

                              {role.summary && <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{role.summary}</p>}

                              <ul className="space-y-3">
                                {role.bullets.map((point, j) => (
                                  <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                                    <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{
                                      backgroundColor: "var(--color-accent)",
                                    }} />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>

                              {role.tags?.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
                                  {role.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
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
