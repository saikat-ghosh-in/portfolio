import { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

const DOTS = [".", "..", "..."];

export default function LoadingScreen() {
  const { isReady, dismissed, dismiss } = useLoading();
  const [show, setShow] = useState(true);
  const [dot, setDot] = useState(0);
  const overlayRef = useRef(null);
  const hasTriggered = useRef(false);

  // Cycle dots
  useEffect(() => {
    const id = setInterval(() => setDot((d) => (d + 1) % DOTS.length), 400);
    return () => clearInterval(id);
  }, []);

  // When blob + photo are ready, play xray collapse then unmount
  useEffect(() => {
    if (!isReady || hasTriggered.current) return;
    hasTriggered.current = true;

    const overlay = overlayRef.current;
    if (!overlay) {
      dismiss();
      setShow(false);
      return;
    }

    // Small pause so user can see "Ready" momentarily
    setTimeout(() => {
      // Collapse the loading screen inward from centre — the xray "close" effect
      const anim = overlay.animate(
        [
          { clipPath: "circle(150% at 50% 20%)" },
          { clipPath: "circle(0%   at 50% 20%)" },
        ],
        {
          duration: 900,
          easing: "cubic-bezier(0.7, 0, 0.1, 1)",
          fill: "forwards",
        }
      );

      anim.onfinish = () => {
        dismiss();
        setShow(false);
      };
    }, 300);
  }, [isReady, dismiss]);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      {/* Subtle grid background matching hero */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo / initials */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center w-24 h-24 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-secondary, var(--color-accent)) 100%)",
            boxShadow: "0 0 60px var(--color-accent-glow, rgba(99,102,241,0.4))",
          }}
        >
          <span
            className="font-black text-4xl text-white select-none"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            SG
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-center"
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Saikat Ghosh
          </p>
        </motion.div>

        {/* Spinner ring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <svg
            className="w-8 h-8 animate-spin"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle
              cx="16" cy="16" r="13"
              stroke="var(--color-border)"
              strokeWidth="3"
            />
            <path
              d="M16 3 A13 13 0 0 1 29 16"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)", minWidth: "8rem", textAlign: "center" }}
        >
          {isReady ? "Ready" : `Loading${DOTS[dot]}`}
        </motion.p>
      </div>
    </div>
  );
}
