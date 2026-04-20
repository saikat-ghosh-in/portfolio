import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });

  const overlayRef = useRef(null);

  // Apply theme to <html> on mount and changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    try {
      localStorage.setItem("portfolio-theme", mode);
    } catch { }
  }, [mode]);

  const toggleMode = useCallback((e) => {
    const x = e?.clientX ?? window.innerWidth - 60;
    const y = e?.clientY ?? 40;
    const newMode = mode === "light" ? "dark" : "light";

    // Calculate the max radius needed to cover the entire viewport
    const maxRadius = Math.ceil(
      Math.sqrt(
        Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2
      )
    );

    const overlay = overlayRef.current;
    if (!overlay) {
      setMode(newMode);
      return;
    }

    // Set the overlay color to the NEW theme's background
    overlay.style.backgroundColor = newMode === "dark" ? "#08080c" : "#ffffff";
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.display = "block";
    overlay.style.opacity = "1";

    // Force reflow
    overlay.offsetHeight;

    // Animate the clip-path expansion
    const anim = overlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.7, 0, 0.1, 1)",
        fill: "forwards",
      }
    );

    // Swap theme at the midpoint
    setTimeout(() => {
      setMode(newMode);
    }, 350);

    anim.onfinish = () => {
      overlay.style.display = "none";
      overlay.style.clipPath = "";
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          display: "none",
        }}
      />
    </ThemeContext.Provider>
  );
}
