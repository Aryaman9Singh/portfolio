import React, { useEffect, useState } from "react";
import { on } from "../../app/utils/events.js";

function makeId() {
  try { return crypto.randomUUID(); } catch { return "t_" + Math.random().toString(36).slice(2); }
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // inject keyframes once
    if (!document.getElementById("aryaman-toast-css")) {
      const css = `
      @keyframes toastPop {
        0%   { opacity: 0; transform: translateY(12px) scale(0.98); }
        12%  { opacity: 1; transform: translateY(0)    scale(1); }
        80%  { opacity: 1; transform: translateY(0)    scale(1); }
        100% { opacity: 0; transform: translateY(6px)  scale(0.995); }
      }`;
      const style = document.createElement("style");
      style.id = "aryaman-toast-css";
      style.textContent = css;
      document.head.appendChild(style);
    }

    const off = on("aryamanflix:toast", (e) => {
      const text = String(e.detail?.text ?? "");
      if (!text) return;
      const id = makeId();
      setToasts((prev) => [...prev, { id, text }]);

      // shorter lifetime (fast fade): 1.6s total
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 1600);
    });
    return off;
  }, []);

  const wrap = {
    position: "fixed",
    right: 12,
    bottom: 12,
    display: "grid",
    gap: 6,
    zIndex: 4000,
    pointerEvents: "none"
  };

  const box = {
    pointerEvents: "auto",
    padding: "8px 12px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.72)", // lower opacity
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,                    // smaller text
    lineHeight: 1.25,
    boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
    maxWidth: "min(72vw, 320px)",
    animation: "toastPop 1600ms ease forwards" // quick in/out
  };

  return (
    <div style={wrap} aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} style={box}>{t.text}</div>
      ))}
    </div>
  );
}
 