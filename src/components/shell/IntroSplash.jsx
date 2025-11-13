import React from "react";

export default function IntroSplash() {
  // minimal local CSS for fade-in/out (kept here to avoid extra files)
  const css = `
    @keyframes splashFade {
      0%   { opacity: 0 }
      15%  { opacity: 1 }
      85%  { opacity: 1 }
      100% { opacity: 0 }
    }
    .splash-root {
      position: fixed; inset: 0;
      background:#000; color:#e50914;
      display:flex; align-items:center; justify-content:center;
    font-family: var(--font-display);
      animation: splashFade 1000ms ease-in-out forwards;
      z-index: 9999;
    }
    .splash-logo {
      font-size: clamp(28px, 6vw, 56px);
      letter-spacing: 1px;
      font-weight: 700;
      text-shadow: 0 2px 24px rgba(229,9,20,0.45);
    }
    @media (prefers-reduced-motion: reduce) {
      .splash-root { animation: none; }
    }
  `;
  return (
    <>
      <style>{css}</style>
      <div className="splash-root">
        <div className="splash-logo">ARYAMAN PUNEET SINGH</div>
      </div>
    </>
  );
}
