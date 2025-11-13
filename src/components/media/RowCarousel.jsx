import React from "react";
import Card from "./Card.jsx";

export default function RowCarousel({ title, items = [], onOpen }) {
  if (!items.length) return null;

  const row = { margin: "0 auto", width: "min(1280px, 100%)", padding: "0 16px 24px" };
  const h2 = { color: "#fff", fontSize: "clamp(16px, 2.2vw, 22px)", margin: "12px 0" };
  const track = {
    display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6, scrollSnapType: "x mandatory"
  };

  return (
    <section style={row}>
      <h2 style={h2}>{title}</h2>
      <div style={track}>
        {items.map(p => (
          <div key={p.slug} style={{ scrollSnapAlign: "start" }}>
            <Card project={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}
