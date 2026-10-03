import SectionWrapper from "../components/SectionWrapper";
import { certifications } from "../data/siteData";
import { FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-20">
      <div className="py-12 relative">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Certifications</h2>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-3xl">
            <div className="space-y-5">
              {certifications.map((cert) => {
                const content = (
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{
                        backgroundColor: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                      }}>
                        <FiAward className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-base font-semibold" style={{ color: "var(--color-text-heading)" }}>{cert.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                          <span>{cert.issuer}</span>
                          {cert.instructor && <><span>·</span><span>{cert.instructor}</span></>}
                          {cert.completedOn && <><span>·</span><span>{cert.completedOn}</span></>}
                        </div>
                      </div>
                    </div>
                    {cert.note && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>{cert.note}</p>}
                    {cert.topics?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.topics.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                );

                return cert.url ? (
                  <motion.a variants={itemVariants} key={cert.id} href={cert.url} target="_blank" rel="noopener noreferrer"
                    className="card block no-underline p-6 transition-transform duration-300 ease-[var(--ease-out)] active:scale-[0.99] group/cert select-none touch-manipulation"
                  >
                    <div className="flex items-start justify-between">
                      <div>{content}</div>
                      <svg className="ml-4 mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-hover/cert:translate-x-0.5" style={{ color: "var(--color-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div variants={itemVariants} key={cert.id} className="card p-6">
                    {content}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
