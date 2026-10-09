import { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import { contact, profile } from "../data/siteData";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("https://formsubmit.co/ajax/saikat.ghosh.in99@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <SectionWrapper id="contact" className="py-20" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Contact</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            Get in touch.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Left Text & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3"
          >
            <p className="mb-8 text-lg" style={{ color: "var(--color-text-muted)" }}>
              {contact.text}
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Email</p>
                <a href={`mailto:${profile.email}`} className="text-sm underline underline-offset-4 transition-colors" style={{ color: "var(--color-text-muted)" }}>
                  {profile.email}
                </a>
              </div>
              
              <div>
                <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Social</p>
                <ul className="space-y-2">
                  <li>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:underline underline-offset-4" style={{ color: "var(--color-text-muted)" }}>
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:underline underline-offset-4" style={{ color: "var(--color-text-muted)" }}>
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Location</p>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {profile.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full border-b py-2 text-sm outline-none bg-transparent transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text-heading)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full border-b py-2 text-sm outline-none bg-transparent transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text-heading)" }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required
                  className="w-full resize-none border-b py-2 h-24 text-sm outline-none bg-transparent transition-colors"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-heading)" }}
                />
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto h-12 px-8">
                {status === "submitting" ? "Sending..." : "Shoot me an email"}
              </button>
              {status === "success" && <p className="mt-3 text-sm font-medium" style={{ color: "#30d158" }}>Message sent successfully!</p>}
              {status === "error" && <p className="mt-3 text-sm font-medium" style={{ color: "#ff453a" }}>Failed to send. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
