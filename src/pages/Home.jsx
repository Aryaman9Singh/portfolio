import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import projects from "../content/projects.json";
import RowCarousel from "../components/media/RowCarousel.jsx";
import HeroBanner from "../components/media/HeroBanner.jsx";
import ProjectModal from "../components/modals/ProjectModal.jsx";
import { getList, onListChange } from "../app/utils/list.js";

export default function Home() {
  const { slug } = useParams();
  const location = useLocation();
  const myListRef = useRef(null);

  // Re-render when My List changes elsewhere
  const [listVersion, setListVersion] = useState(0);
  useEffect(() => onListChange(() => setListVersion(v => v + 1)), []);

  // Visible projects for this profile
  const visible = useMemo(
    () => projects.filter(p => Array.isArray(p.profiles) && p.profiles.includes(slug)),
    [slug]
  );

  // Featured pick
  const featured =
    visible.find(p => p.featuredFor?.includes(slug)) || visible[0];

  // More (excluding featured)
  const more = featured
    ? visible.filter(p => p.slug !== featured.slug)
    : visible.slice(1);

  // My List (for this profile)
  const myListSlugs = useMemo(() => Array.from(getList(slug)), [slug, listVersion]);
  const myList = useMemo(
    () => visible.filter(p => myListSlugs.includes(p.slug)),
    [visible, myListSlugs]
  );

  // -------- CATEGORY / GENRE LOGIC --------
  const norm = (s = "") => s.toLowerCase();
  const hasAny = (arr = [], keys = []) => {
    const hay = (arr || []).map(norm);
    return keys.some(k => hay.some(h => h.includes(norm(k))));
  };

  // Rules: match by badges/tags/title to build curated buckets
  const bucketRules = [
    {
      title: "AI & Automation",
      test: (p) =>
        hasAny(p.badges, ["ai", "ml", "openai", "automation", "summarizer", "nlp"]) ||
        /ai|ml|bot|auto|summar/i.test(`${p.title} ${p.tagline || ""}`)
    },
    {
      title: "Web Apps",
      test: (p) =>
        hasAny(p.badges, ["react", "next.js", "pwa", "web", "graphql"]) ||
        /web|react|next|app/i.test(`${p.title} ${p.tagline || ""}`)
    },
    {
      title: "DevOps & Cloud",
      test: (p) =>
        hasAny(p.badges, ["kubernetes", "k8s", "docker", "sre", "devops", "aws", "gcp", "opa", "prometheus", "grafana"]) ||
        /cloud|sre|deploy|mesh|gateway/i.test(`${p.title} ${p.tagline || ""}`)
    },
    {
      title: "Data & Analytics",
      test: (p) =>
        hasAny(p.badges, ["analytics", "etl", "timeseries", "tsdb", "bi", "d3"]) ||
        /analytics|dashboard|timeseries|bi|insights/i.test(`${p.title} ${p.tagline || ""}`)
    },
    {
      title: "Mobile & AR",
      test: (p) =>
        hasAny(p.badges, ["expo", "mobile", "ar", "tflite"]) ||
        /mobile|android|ios|ar/i.test(`${p.title} ${p.tagline || ""}`)
    },
    {
      title: "Experiments & Tools",
      test: (p) =>
        hasAny(p.badges, ["cli", "dx", "snippets", "wasm", "webgl", "three.js", "design system"]) ||
        /playground|experiment|tool|utils|starter/i.test(`${p.title} ${p.tagline || ""}`)
    }
  ];

  // Assign each visible project to its FIRST matching bucket (order matters)
  const categorized = useMemo(() => {
    const used = new Set();
    const rows = [];

    // Ensure featured is not duplicated later
    const pool = visible.filter(p => !featured || p.slug !== featured.slug);

    for (const rule of bucketRules) {
      const items = pool.filter(p => !used.has(p.slug) && rule.test(p));
      if (items.length > 0) {
        // cap to ~12 per row to keep it tight
        const take = items.slice(0, 12);
        take.forEach(p => used.add(p.slug));
        rows.push({ title: rule.title, items: take });
      }
    }

    // Fallback row if something didn’t fit
    const leftovers = pool.filter(p => !used.has(p.slug));
    if (leftovers.length) {
      rows.push({ title: "More for You", items: leftovers.slice(0, 12) });
    }

    return rows;
  }, [visible, featured, bucketRules]);

  // Modal for hero "More Info"
  const [open, setOpen] = useState(false);

  // Smooth scroll to #my-list when present
  useEffect(() => {
    if (location.hash !== "#my-list") return;
    const scrollToMyList = () => {
      const el = document.getElementById("my-list");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollToMyList();
    const t = setTimeout(scrollToMyList, 0);
    return () => clearTimeout(t);
  }, [location.hash, myList.length]);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* HERO */}
      <HeroBanner project={featured} onMore={() => setOpen(true)} />

      {/* ROWS */}
      <div style={{ paddingTop: 12 }}>
        {myList.length > 0 && (
          <section id="my-list" style={{ scrollMarginTop: 72 }}>
            <RowCarousel title="My List" items={myList} />
          </section>
        )}

        {/* Optional single highlight */}
        {featured && <RowCarousel title="Aryaman Originals" items={[featured]} />}

        {/* Category/Genre rows */}
        {categorized.map((row) => (
          <RowCarousel key={row.title} title={row.title} items={row.items} />
        ))}
      </div>

      {/* Modal for the featured project */}
      <ProjectModal
        project={featured}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
