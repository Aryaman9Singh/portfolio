import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ModalBase({
  open,
  onClose,
  ariaLabel = "Dialog",
  maxWidth = 920,
  children
}) {
  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  const card = {
    width: `min(${maxWidth}px, 96vw)`,
    maxHeight: "min(86vh, 1000px)",
    background: "rgba(0,0,0,0.92)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    overflow: "hidden",
    color: "#fff",
    boxShadow: "0 30px 80px rgba(0,0,0,0.65)",
    display: "grid",
    gridTemplateRows: "auto 1fr auto"
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              zIndex: 3000
            }}
          />
          {/* Centered dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              inset: 0,
              display: "grid",
              placeItems: "center",
              zIndex: 3001,
              padding: 20
            }}
          >
            <div style={card}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
