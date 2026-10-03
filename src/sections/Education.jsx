import SectionWrapper from "../components/SectionWrapper";
import { education } from "../data/siteData";
import { FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-20">
      <div className="py-12 relative">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Education</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-xl"
          >
            <div className="card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                }}>
                  <FiBookOpen className="h-6 w-6" />
                </span>
              </div>

              <div className="space-y-6">
                {education.map((ed) => (
                  <div key={ed.id || ed.degree}>
                    <p className="text-lg font-semibold" style={{ color: "var(--color-text-heading)" }}>{ed.degree}</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>{ed.institution}</p>
                    <span className="tag mt-3 inline-block">{ed.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
