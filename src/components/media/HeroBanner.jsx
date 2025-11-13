import React from "react";

export default function HeroBanner({ project, onMore }) {
  if (!project) return null;

  const root = {
    position: "relative",
    height: "clamp(42vh, 58vw, 62vh)",
    minHeight: 320,
    maxHeight: 760,
    background: "#000",
    color: "#fff",
    overflow: "hidden",
  };

  const img = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.6) saturate(1.05)",
  };

  const gradient = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.1) 100%)",
  };

  const content = {
    position: "relative",
    zIndex: 1,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    padding: "clamp(16px, 3vw, 32px)",
    maxWidth: "min(1280px, 100%)",
    margin: "0 auto",
  };

  const text = {
    maxWidth: "min(680px, 92%)",
    display: "grid",
    gap: "8px",
    marginBottom: "clamp(12px, 3vw, 24px)",
  };

  const title = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.6rem, 5vw, 3rem)",
    color: "#fff",
    textShadow: "0 4px 24px rgba(0,0,0,0.6)",
  };

  const tagline = {
    fontFamily: "var(--font-body)",
    fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
    opacity: 0.9,
  };

  const actions = {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
    flexWrap: "wrap",
  };

  const play = {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  };

  const more = {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.22)",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
  };

  return (
    <section style={root}>
      <img src={project.poster} alt={project.title} style={img} />
      <div style={gradient} />

      <div style={content}>
        <div style={text}>
          <h1 style={title} className="display-font">{project.title}</h1>
          <p style={tagline}>{project.tagline}</p>
          <div style={actions}>
            <button
              style={play}
              onClick={() => alert(`Playing teaser for: ${project.title}`)}
            >
              ▶ Play
            </button>
            <button style={more} onClick={onMore}>
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
