import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PROFILES = [
  {
    key: "about",
    title: "About Me",
    subtitle: "Story, values, and contact",
    img: "/avatars/playground-icon.svg", // you can swap icons later if you want
    accent: "#e50914",
    route: "/about" // special route
  },
  {
    key: "recruiter",
    title: "Recruiter",
    subtitle: "Impact-first highlights",
    img: "/avatars/recruiter-icon.svg",
    accent: "#e50914",
    route: "/profile/recruiter-hr" // existing slug
  },
  {
    key: "dev",
    title: "Development",
    subtitle: "Builds, scale, metrics",
    img: "/avatars/cloud-icon.svg",
    accent: "#ffb703",
    route: "/profile/engineering" // existing slug
  },
  {
    key: "misc",
    title: "Misc",
    subtitle: "Experiments & tools",
    img: "/avatars/engineering-icon.svg",
    accent: "#a3e635",
    route: "/profile/playground" // existing slug
  }
];

export default function ProfilePicker() {
  const navigate = useNavigate();

  const wrap = {
    minHeight: "80vh",
    background: "#000",
    display: "grid",
    placeItems: "center",
    padding: "clamp(16px, 4vw, 40px)"
  };

  const grid = {
    width: "min(1200px, 94vw)",
    display: "grid",
    gap: "clamp(14px, 3vw, 24px)",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
  };

  const title = {
    width: "min(1200px, 94vw)",
    margin: "0 auto clamp(14px, 2.5vw, 22px)",
    fontFamily: "var(--font-display)",
    color: "#fff",
    letterSpacing: "0.4px",
    fontSize: "clamp(20px, 3vw, 28px)",
    opacity: 0.9
  };

  const cardBase = {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    height: "clamp(180px, 28vw, 280px)",
    cursor: "pointer",
    userSelect: "none",
    background: "#111",
    boxShadow: "0 10px 40px rgba(0,0,0,0.45)"
  };

  const img = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.9)"
  };

  const veil = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 85%)"
  };

  const info = (accent) => ({
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    display: "grid",
    gap: 6,
    color: "#fff",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
    borderLeft: `4px solid ${accent}`,
    paddingLeft: 10
  });

  const name = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(18px, 2.4vw, 24px)",
    lineHeight: 1.1,
    letterSpacing: "0.2px"
  };

  const sub = {
    fontFamily: "var(--font-body)",
    fontSize: "clamp(12px, 2vw, 14px)",
    opacity: 0.85
  };

  const enter = {
    marginTop: 4,
    width: "fit-content",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 12,
    fontFamily: "var(--font-body)",
    display:"none",
    
  };

  const onPick = (route) => navigate(route);

  return (
    <div style={wrap}>
      <div style={title}>Who’s viewing?</div>
      <div style={grid}>
        {PROFILES.map((p) => (
          <motion.button
            key={p.key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => onPick(p.route)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onPick(p.route);
            }}
            style={cardBase}
            aria-label={`${p.title} profile`}
          >
            <img src={p.img} alt="" style={img} />
            <div style={veil} />
            <div style={info(p.accent)}>
              <div style={name}>{p.title}</div>
              <div style={sub}>{p.subtitle}</div>
              <div style={enter}>Enter</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
