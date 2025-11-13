import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AppShell({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const header = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    background: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.3)",
    transition: "background 300ms ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    zIndex: 1000,
    backdropFilter: "blur(8px)"
  };

  const logo = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
    color: "#e50914",
    cursor: "pointer",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    textDecoration: "none"
  };

  const right = {
    display: "flex",
    gap: 16,
    alignItems: "center"
  };

  const avatarBtn = {
    width: "clamp(28px, 5vw, 36px)",
    height: "clamp(28px, 5vw, 36px)",
    borderRadius: "50%",
    background: "#333",
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(14px, 3vw, 18px)",
    color: "#fff",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.15)"
  };

  const menu = {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    width: "min(220px, 80vw)",
    background: "rgba(0,0,0,0.95)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    padding: 8
  };

  const itemBase = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "10px 12px",
    background: "transparent",
    color: "#fff",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "var(--font-body)"
  };

  const itemHover = (e) =>
    (e.currentTarget.style.background = "rgba(255,255,255,0.08)");
  const itemLeave = (e) =>
    (e.currentTarget.style.background = "transparent");

  return (
    <>
      <header style={header}>
        {/* Logo → go back to profile picker */}
        <Link to="/" style={logo}>
          Aryaman Puneet Singh
        </Link>

        <div style={right}>
          {/* Single dropdown button */}
          <div style={{ position: "relative" }} ref={menuRef}>
            <button
              type="button"
              style={avatarBtn}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              title="Menu"
            >
              🧑‍💻
            </button>

            {menuOpen && (
              <div style={menu} role="menu">
                {/* View CV */}
                <a
                  href="/Aryaman_Puneet_Singh_CV.pdf" // 🔁 change to your actual CV path/file name
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...itemBase, textDecoration: "none" }}
                  onMouseEnter={itemHover}
                  onMouseLeave={itemLeave}
                  role="menuitem"
                >
                  📄 View CV
                </a>

                {/* Switch Profile */}
                <button
                  style={itemBase}
                  onMouseEnter={itemHover}
                  onMouseLeave={itemLeave}
                  onClick={() => navigate("/")}
                  role="menuitem"
                >
                  🔄 Switch Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* spacer for fixed header */}
      <div style={{ paddingTop: 64 }}>{children}</div>
    </>
  );
}
