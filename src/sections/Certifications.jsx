import { certifications } from "../data/siteData";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Certifications</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            Courses and achievements.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div 
                className="certification-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6"
              >
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className={`text-lg font-medium tracking-tight ${cert.url ? "pr-2" : ""}`} style={{ color: "var(--color-text-heading)" }}>
                      {cert.title}
                    </h3>
                    {cert.url && (
                      <span aria-hidden="true" className="pointer-events-none flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "color-mix(in srgb, var(--color-border) 55%, transparent)", color: "var(--color-text-muted)" }}>
                        <FiExternalLink className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                    <span>{cert.issuer}</span>
                    {cert.completedOn && <><span>·</span><span>{cert.completedOn}</span></>}
                  </div>
                  {cert.note && (
                    <p className="text-sm line-clamp-3 leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
                      {cert.note}
                    </p>
                  )}
                  {cert.topics?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {cert.topics.map((t) => (
                        <span key={t} className="rounded-full px-3 py-1 text-xs transition-colors border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.title} certification`} className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-offset-4">
                    <span className="sr-only">View Certification</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
