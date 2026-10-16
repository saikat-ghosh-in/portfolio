import SectionWrapper from "../components/SectionWrapper";
import experience from "../data/experience";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="py-20 section-tint">
      <div className="glass-surface mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Work Experience</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            Where the work happened.
          </h2>
        </motion.div>

        <div className="border-t" style={{ borderColor: "var(--color-border)" }}>
          {experience.map((companyData) => (
            companyData.roles.map((role, idx) => (
              <motion.div 
                key={`${companyData.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[200px_1fr] border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p className="text-sm md:pt-1" style={{ color: "var(--color-text-muted)" }}>
                  {role.period}
                </p>
                <div>
                  <h3 className="text-xl font-medium leading-snug" style={{ color: "var(--color-text-heading)" }}>
                    {role.title}
                  </h3>
                  <p className="mt-1" style={{ color: "var(--color-text-muted)" }}>
                    {companyData.company} · {companyData.location}
                  </p>
                  
                  <ul className="mt-4 space-y-3 max-w-prose">
                    {role.bullets.map((point, j) => (
                      <li key={j} className="relative pl-5 text-sm md:text-base leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                        <span aria-hidden="true" className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-text-muted)" }} />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {role.tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((tag, j) => (
                        <span key={j} className="rounded-full px-3 py-1 text-sm transition-colors" style={{ backgroundColor: "var(--color-bg-surface-sunken)", color: "var(--color-text-muted)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ))}
        </div>
      </div>
    </section>
  );
}
