import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { LiaMousePointerSolid } from "react-icons/lia";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeOnboarding({ isDark }) {
  const { dismissed } = useLoading();
  const [started, setStarted]   = useState(false);
  const [visible, setVisible]   = useState(true);

  // Wait for loading screen to dismiss, then start after 1s delay
  useEffect(() => {
    if (!dismissed) return;
    const t = setTimeout(() => setStarted(true), 1000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Auto-hide 5s after the animation starts
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [started]);

  if (!started || !visible) return null;

  // Shared clip-path keyframes — same shape regardless of mode
  const clipFrames = [
    "inset(132px 114px 132px 114px round 18px)",
    "inset(132px 114px 132px 114px round 18px)",
    "inset(132px 114px 132px 114px round 18px)",
    "inset(0px 0px 0px 0px round 150px)",
    "inset(0px 0px 0px 0px round 150px)",
    "inset(132px 114px 132px 114px round 18px)",
  ];
  const clipTimes = [0, 0.39, 0.4, 0.5, 0.8, 1];

  // ── USER IS IN DARK MODE → preview the light theme ────────────────────────
  if (isDark) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] flex items-center justify-center">
        <motion.div
          initial={{ clipPath: clipFrames[0], opacity: 0 }}
          animate={{ clipPath: clipFrames, opacity: [0, 0, 1, 1, 1, 0] }}
          transition={{ times: clipTimes, duration: 4.5 }}
          className="absolute overflow-hidden"
          style={{ width: "300px", height: "300px", backgroundColor: "#f8fafc", borderRadius: "50%" }}
        >
          {/* Light mode grid */}
          <div
            className="absolute left-0 right-0 bottom-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50"
            style={{ top: "184px" }}
          />
          {/* Light mode navbar */}
          <div
            className="absolute left-0 right-0 backdrop-blur-lg"
            style={{ top: "116px", height: "68px", backgroundColor: "rgba(255,255,255,0.8)", borderBottom: "1px solid #e2e8f0" }}
          />
          {/* Fake nav links */}
          <ul className="absolute flex items-center gap-1" style={{ right: "202px", top: "150px", transform: "translateY(-50%)" }}>
            <li><span className="relative px-3 py-2 text-sm font-medium" style={{ color: "#64748b", fontFamily: "var(--font-sans)", fontWeight: 500 }}>Education</span></li>
            <li><span className="relative px-3 py-2 text-sm font-medium" style={{ color: "#64748b", fontFamily: "var(--font-sans)", fontWeight: 500 }}>Contact</span></li>
          </ul>
          {/* Toggle preview — slides to sun (left = light) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-[72px] h-9 rounded-full p-1"
            style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}
          >
            <motion.div
              className="absolute w-7 h-7 rounded-full shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
              initial={{ x: 34 }}
              animate={{ x: [34, 34, 34, 0, 0, 34] }}
              transition={{ times: clipTimes, duration: 4.5 }}
            />
            <div className="relative z-10 flex items-center justify-center w-7 h-7">
              <FiSun className="w-4 h-4" style={{ color: "#2563eb" }} />
            </div>
            <div className="relative z-10 flex items-center justify-center w-7 h-7">
              <FiMoon className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </div>
          </div>
        </motion.div>

        {/* Cursor */}
        <motion.div
          initial={{ x: 60, y: 60, opacity: 0 }}
          animate={{ x: [60, 0, 0, 0, 60], y: [60, 0, 0, 0, 60], opacity: [0, 1, 1, 1, 0], scale: [1, 1, 0.85, 1, 1] }}
          transition={{ times: [0, 0.3, 0.4, 0.8, 1], duration: 4.5 }}
          className="absolute top-1/2 left-1/2 drop-shadow-2xl"
        >
          <LiaMousePointerSolid size={42} color="#ffffff" style={{ stroke: "#000000", strokeWidth: "0.5px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }} />
        </motion.div>
      </div>
    );
  }

  // ── USER IS IN LIGHT MODE → preview the dark theme ────────────────────────
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] flex items-center justify-center">
      <motion.div
        initial={{ clipPath: clipFrames[0], opacity: 0 }}
        animate={{ clipPath: clipFrames, opacity: [0, 0, 1, 1, 1, 0] }}
        transition={{ times: clipTimes, duration: 4.5 }}
        className="absolute overflow-hidden"
        style={{ width: "300px", height: "300px", backgroundColor: "#0a0a12", borderRadius: "50%" }}
      >
        {/* Dark mode grid */}
        <div
          className="absolute left-0 right-0 bottom-0 opacity-20"
          style={{
            top: "184px",
            backgroundImage: "linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        {/* Dark mode navbar */}
        <div
          className="absolute left-0 right-0"
          style={{ top: "116px", height: "68px", backgroundColor: "rgba(10,10,18,0.85)", borderBottom: "1px solid rgba(129,140,248,0.15)" }}
        />
        {/* Fake nav links */}
        <ul className="absolute flex items-center gap-1" style={{ right: "202px", top: "150px", transform: "translateY(-50%)" }}>
          <li><span className="relative px-3 py-2 text-sm font-bold uppercase tracking-widest" style={{ color: "#94a3b8", fontFamily: "var(--font-display)", fontSize: "11px" }}>Education</span></li>
          <li><span className="relative px-3 py-2 text-sm font-bold uppercase tracking-widest" style={{ color: "#94a3b8", fontFamily: "var(--font-display)", fontSize: "11px" }}>Contact</span></li>
        </ul>
        {/* Toggle preview — slides to moon (right = dark) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-[72px] h-9 rounded-full p-1"
          style={{ backgroundColor: "#1e1b4b", border: "1px solid rgba(129,140,248,0.3)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)" }}
        >
          <motion.div
            className="absolute w-7 h-7 rounded-full"
            style={{ backgroundColor: "#4f46e5", boxShadow: "0 0 12px rgba(99,102,241,0.6)" }}
            initial={{ x: 0 }}
            animate={{ x: [0, 0, 0, 34, 34, 0] }}
            transition={{ times: clipTimes, duration: 4.5 }}
          />
          <div className="relative z-10 flex items-center justify-center w-7 h-7">
            <FiSun className="w-4 h-4" style={{ color: "#94a3b8" }} />
          </div>
          <div className="relative z-10 flex items-center justify-center w-7 h-7">
            <FiMoon className="w-4 h-4" style={{ color: "#818cf8" }} />
          </div>
        </div>
      </motion.div>

      {/* Cursor — white outline looks good on both light and dark previews */}
      <motion.div
        initial={{ x: 60, y: 60, opacity: 0 }}
        animate={{ x: [60, 0, 0, 0, 60], y: [60, 0, 0, 0, 60], opacity: [0, 1, 1, 1, 0], scale: [1, 1, 0.85, 1, 1] }}
        transition={{ times: [0, 0.3, 0.4, 0.8, 1], duration: 4.5 }}
        className="absolute top-1/2 left-1/2 drop-shadow-2xl"
      >
        <LiaMousePointerSolid size={42} color="#000000" style={{ stroke: "#ffffff", strokeWidth: "0.5px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }} />
      </motion.div>
    </div>
  );
}

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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 backdrop-blur-lg`}
      style={{
        backgroundColor: "var(--color-nav-bg)",
        borderBottom: scrolled ? "1px solid var(--color-nav-border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Left — Name */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-xl font-extrabold no-underline transition-colors"
          style={{
            color: "var(--color-text-heading)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {profile.name}
        </a>

        {/* Desktop Links + Toggle */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 no-underline ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"}`}
                    style={{
                      fontFamily: "var(--font-display)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 h-0.5 w-full"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          boxShadow: isDark ? "0 0 8px var(--color-accent-glow)" : "none",
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="ml-4 relative">
            <ThemeToggle />
            <ThemeOnboarding isDark={isDark} />
          </div>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="relative">
            <ThemeToggle />
            <ThemeOnboarding isDark={isDark} />
          </div>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center transition-colors"
            style={{
              color: "var(--color-text-heading)",
              borderRadius: "var(--radius-button)",
            }}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
        style={{
          borderTop: mobileOpen ? "1px solid var(--color-border)" : "none",
        }}
      >
        <div className="px-6 py-4" style={{ backgroundColor: "var(--color-bg-surface)" }}>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block px-4 py-3 font-medium transition-colors no-underline"
                    style={{
                      color: isActive ? "var(--color-accent)" : "var(--color-text-body)",
                      backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
                      borderRadius: "var(--radius-button)",
                      borderLeft: isActive ? "3px solid var(--color-accent)" : "3px solid transparent",
                      fontFamily: isDark ? "var(--font-display)" : "var(--font-sans)",
                      textTransform: isDark ? "uppercase" : "none",
                      letterSpacing: isDark ? "0.08em" : "0",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
