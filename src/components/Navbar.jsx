import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { mode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const isDark = mode === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      id="navbar"
      className="fixed top-0 left-0 right-0 z-[10000] transition-[background-color,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? "var(--color-nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-nav-border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Left — Name */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-base font-semibold no-underline transition-colors"
          style={{
            color: "var(--color-text-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          {profile.name}
        </a>

        {/* Desktop Links + Toggle */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3 py-1.5 text-xs font-normal transition-colors duration-200 no-underline rounded-full ${isActive ? "text-[var(--color-text-heading)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-heading)]"}`}
                    style={isActive ? {
                      backgroundColor: "var(--color-accent-soft)",
                    } : {}}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.92 }}
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center transition-[background-color] duration-150 cursor-pointer select-none touch-manipulation"
            style={{
              color: "var(--color-text-heading)",
              borderRadius: "var(--radius-button)",
            }}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-nav-bg)",
              backdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <div className="px-6 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block px-4 py-3 text-sm font-normal transition-[background-color,color] duration-150 active:scale-[0.98] select-none touch-manipulation no-underline"
                        style={{
                          color: isActive ? "var(--color-accent)" : "var(--color-text-body)",
                          backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
                          borderRadius: "12px",
                        }}
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
