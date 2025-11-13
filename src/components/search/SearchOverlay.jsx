import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { on } from "../../app/utils/events.js";
import { useParams } from "react-router-dom";
import projects from "../../content/projects.json";
import Card from "../media/Card.jsx";

export default function SearchOverlay({ open, onClose, setOpen }) {
  const { slug } = useParams(); // profile scope
  const inputRef = useRef(null);
  const [q, setQ] = useState("");

  // open on global event
  useEffect(() => on("aryamanflix:search:open", () => setOpen(true)), [setOpen]);

  // focus the input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQ("");
    }
  }, [open]);

  // keyboard shortcuts: ESC to close, "/" to open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, setOpen]);

  // profile-scoped results
  const visible = useMemo(
    () => projects.filter((p) => p.profiles.includes(slug)),
    [slug]
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return visible;
    return visible.filter((p) => {
      const hay = [
        p.title,
        p.tagline,
        ...(p.badges || []),
        ...(p.profiles || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [q, visible]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 2000,
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)"
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed", left: "50%", top: 90, transform: "translateX(-50%)",
              zIndex: 2001, width: "min(1000px, 92%)",
              background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: 16
            }}
          >
            {/* Search bar */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "#e50914", fontSize: 18 }}>⌕</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search your projects (type, press ESC to close, / to open)…"
                style={{
                  flex: 1, border: "none", outline: "none",
                  background: "transparent", color: "#fff",
                  fontSize: "1rem", padding: "10px 4px"
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: "#e50914", color: "#fff", border: "none",
                  padding: "8px 12px", borderRadius: 8, cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>

            {/* Results */}
            <div
              style={{
                marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              {results.length === 0 ? (
                <div style={{ color: "#bbb", padding: "16px 4px" }}>
                  No results. Try a different keyword.
                </div>
              ) : (
                <div
                  style={{
                    display: "grid", gap: 12,
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
                  }}
                >
                  {results.map((p) => (
                    <Card key={p.slug} project={p} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
