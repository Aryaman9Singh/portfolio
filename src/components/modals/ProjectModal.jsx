import React from "react";
import ModalBase from "./ModalBase.jsx";

export default function ProjectModal({ project, open, onClose }) {
  const p = project || {};

  const banner = {
    position: "relative",
    height: "min(42vh, 360px)",
    background: "#111"
  };
  const poster = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.9)",
    display: "block"
  };
  const gradient = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.75) 100%)"
  };
  const closeBtn = {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    cursor: "pointer"
  };
  const section = { padding: "18px 20px 8px" };
  const metaChip = {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 12
  };
  const chipRow = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 };
  const footer = {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "12px 16px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.6)"
  };
  const cta = {
    textDecoration: "none",
    background: "#e50914",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 14
  };

  const Chips = ({ items }) =>
    !items || items.length === 0 ? null : (
      <div style={chipRow}>
        {items.map((t) => (
          <span key={t} style={metaChip}>
            {t}
          </span>
        ))}
      </div>
    );

  const Links = ({ links }) => {
    if (!links) return null;
    const { github, liveDemo, caseStudy } = links;
    return (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {github && (
          <a href={github} target="_blank" rel="noreferrer" style={cta}>
            GitHub
          </a>
        )}
        {liveDemo && (
          <a href={liveDemo} target="_blank" rel="noreferrer" style={cta}>
            Live Demo
          </a>
        )}
        {caseStudy && (
          <a href={caseStudy} target="_blank" rel="noreferrer" style={cta}>
            Case Study
          </a>
        )}
      </div>
    );
  };

  return (
    <ModalBase open={open} onClose={onClose} ariaLabel={p.title || "Project"}>
      {/* Banner */}
      <div style={banner}>
        {p.poster && <img src={p.poster} alt="" style={poster} />}
        <div style={gradient} />
        <button onClick={onClose} aria-label="Close" style={closeBtn}>
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ ...section, overflowY: "auto", display: "grid", gap: 12 }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 3.6vw, 28px)",
              letterSpacing: "0.3px"
            }}
          >
            {p.title || "Untitled Project"}
          </div>
          {p.tagline && (
            <div style={{ marginTop: 6, opacity: 0.85 }}>
              {p.tagline}
            </div>
          )}
        </div>

        {(p.role || p.duration) && (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {p.role && <span style={metaChip}>Role: {p.role}</span>}
            {p.duration && <span style={metaChip}>Duration: {p.duration}</span>}
          </div>
        )}

        {p.stack?.length ? (
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
              Tech Stack
            </div>
            <Chips items={p.stack} />
          </div>
        ) : null}

        {p.highlights?.length ? (
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>
              Highlights
            </div>
            <ul style={{ paddingLeft: 18, display: "grid", gap: 6 }}>
              {p.highlights.map((h, i) => (
                <li key={i} style={{ lineHeight: 1.45 }}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {p.badges?.length ? (
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
              Tags
            </div>
            <Chips items={p.badges} />
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div style={footer}>
        <Links links={p.links} />
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer",
            marginLeft: "auto"
          }}
        >
          Close
        </button>
      </div>
    </ModalBase>
  );
}
