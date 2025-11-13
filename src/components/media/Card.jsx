import React, { useEffect, useState } from "react";
import ProjectModal from "../modals/ProjectModal.jsx";
import { inList, toggleInList, onListChange } from "../../app/utils/list.js";
import { useParams } from "react-router-dom";
import { emit } from "../../app/utils/events.js"; // ⬅️ make sure this import exists

export default function Card({ project }) {
  const { slug: profileSlug } = useParams();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profileSlug) setSaved(inList(profileSlug, project.slug));
    const off = onListChange(() => {
      if (profileSlug) setSaved(inList(profileSlug, project.slug));
    });
    return off;
  }, [profileSlug, project.slug]);

  const wrap = {
    position: "relative",
    width: "clamp(160px, 42vw, 260px)",
    aspectRatio: "16 / 9",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 200ms ease, box-shadow 200ms ease",
    background: "#111",
    flex: "0 0 auto",
  };

  const img = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  // IMPORTANT: overlay should NOT intercept clicks meant for the chip
  const overlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.05) 60%)",
    color: "#fff",
    display: "flex",
    alignItems: "flex-end",
    padding: 10,
    gap: 6,
    pointerEvents: "none", // let clicks pass through (chip can still be clicked)
    zIndex: 1,
  };

  const title = { fontWeight: 700, fontSize: 14 };
  const badge = {
    fontSize: 11,
    padding: "2px 6px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 6,
  };

  // Chip MUST sit above overlay + be clickable on its own
  const chip = {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 12,
    padding: "6px 8px",
    borderRadius: 8,
    background: saved ? "rgba(229,9,20,0.9)" : "rgba(0,0,0,0.45)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(6px)",
    zIndex: 3, // above overlay/content
    pointerEvents: "auto", // ensure it can be clicked
    cursor: "pointer",
  };

  const onCardEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
  };

  const onCardLeave = (e) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = "";
  };

  const openModal = () => setOpen(true);

  const toggle = (e) => {
    e.stopPropagation();
    const next = toggleInList(profileSlug, project.slug);
    setSaved(next);
    emit("aryamanflix:toast", {
      text: next
        ? `Added “${project.title}” to My List`
        : `Removed “${project.title}”`
    });
  };


  return (
    <>
      {/* Card Poster */}
      <div
        style={wrap}
        onMouseEnter={onCardEnter}
        onMouseLeave={onCardLeave}
        onClick={openModal}
        title={project.title}
      >
        <img
          src={project.poster}
          alt={project.title}
          style={img}
          loading="lazy"
        />

        {/* My List chip (independent clickable target) */}
        {profileSlug && (
          <button
            type="button"
            style={chip}
            onClick={toggle}
            aria-pressed={saved}
            aria-label={saved ? "Remove from My List" : "Add to My List"}
            title={saved ? "Remove from My List" : "Add to My List"}
          >
            {saved ? "✓ In My List" : "＋ My List"}
          </button>
        )}

        {/* Content overlay (non-interactive; clicks go to card) */}
        <div style={overlay}>
          <div style={{ display: "grid", gap: 4, pointerEvents: "none" }}>
            <div style={title}>{project.title}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(project.badges || [])
                .slice(0, 2)
                .map((b) => (
                  <span key={b} style={badge}>
                    {b}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={project}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
