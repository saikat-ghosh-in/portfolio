import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { mode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");

    if (location.pathname !== "/") {
      navigate("/" + href);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      id="navbar"
      className="nav-glass fixed top-0 left-0 right-0 z-[10000]"
      style={{
        backgroundColor: "transparent",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left — Logo and Name */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex shrink-0 items-center gap-2.5 text-base font-medium transition-colors no-underline"
          style={{ color: "var(--color-text-heading)" }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium" style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-primary)" }}>
            SG
          </span>
          <span className="hidden whitespace-nowrap tracking-tight xl:inline">{profile.name}</span>
        </a>

        {/* Desktop Links + Toggle + CTA */}
        <div className="hidden items-center gap-4 xl:flex 2xl:gap-8">
          <ul className="flex items-center gap-3 2xl:gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="whitespace-nowrap text-xs font-medium transition-colors duration-200 no-underline 2xl:text-sm"
                    style={{ color: isActive ? "var(--color-text-heading)" : "var(--color-text-muted)" }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full text-xs font-medium transition-colors h-9 px-3 2xl:px-4 2xl:text-sm"
              style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-primary)" }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Mobile: CTA, Toggle + Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs"
            style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-primary)" }}
          >
            Get in touch
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center transition-colors duration-150 cursor-pointer"
            style={{ color: "var(--color-text-heading)" }}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-dropdown relative overflow-hidden xl:hidden"
            style={{
              backgroundColor: "transparent",
            }}
          >
            <div className="px-6 py-4 max-h-[calc(100svh-60px)] overflow-y-auto">
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.href} className="border-b" style={{ borderColor: "var(--color-border)" }}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block py-4 text-base transition-colors duration-150 no-underline"
                        style={{ color: isActive ? "var(--color-text-heading)" : "var(--color-text-body)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
