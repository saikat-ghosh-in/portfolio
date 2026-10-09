import SectionWrapper from "../components/SectionWrapper";
import { education } from "../data/siteData";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="py-20" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Education</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            Academic Background.
          </h2>
        </motion.div>

        <div className="border-t" style={{ borderColor: "var(--color-border)" }}>
          {education.map((ed, idx) => (
            <motion.div 
              key={ed.id || ed.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[200px_1fr] border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p className="text-sm md:pt-1" style={{ color: "var(--color-text-muted)" }}>
                {ed.period}
              </p>
              <div>
                <h3 className="text-xl font-medium leading-snug" style={{ color: "var(--color-text-heading)" }}>
                  {ed.degree}
                </h3>
                <p className="mt-1" style={{ color: "var(--color-text-muted)" }}>
                  {ed.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
