import React, { useState } from "react";
import { motion } from "framer-motion";
import "./about.css";
import ChatBotButton from "../components/chatbot/ChatBotButton";
import ChatBotModal from "../components/chatbot/ChatBotModal";


const sectionVariants = (direction = "left") => {
  const x = direction === "left" ? -40 : 40;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: "easeOut" }
    }
  };
};

const viewport = { once: true, amount: 0.3 };

export default function About() {

const [botOpen, setBotOpen] = useState(false);
  return (
    <div className="about-page">
      <main className="about-shell">
        {/* SECTION 1: HERO */}
        <motion.section
          className="about-card about-hero"
          variants={sectionVariants("left")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="about-hero-bg" />
          <div className="about-hero-overlay" />

          <div className="about-hero-inner">
            {/* Left side text */}
            <div style={{ display: "grid", gap: 10 }}>
              <div className="about-section-label">About</div>
              <div className="about-pill">
                <span style={{ fontSize: 14 }}>👋</span>
                <span>Aryaman Puneet Singh</span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
                  margin: 0
                }}
              >
                Software Engineer 
              </h1>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                
                  margin: 0
                }}
              >
               Well Hello 
              </h3>
              <p
                style={{
                  margin: 0,
                  opacity: 0.9,
                  fontSize: 14,
                  maxWidth: 640
                }}
              >
                Based in India, currently working as a Software Development
                Engineer. I like taking messy
                problems and turning them into clean APIs, stable services, and
                interfaces people actually enjoy using. Yes, I sleep a lot and finding ways to stop my doom-scrolling.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  fontSize: 13,
                  opacity: 0.9,
                  marginTop: 6
                }}
              >
                <span>📍 Mumbai, India</span>
                <span style={{ opacity: 0.6 }}>•</span>
                <span>🎓 B.Tech CSE – GLA University</span>
                <span style={{ opacity: 0.6 }}>•</span>
                <span>💼 SDE @ Capgemini</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  fontSize: 12,
                  opacity: 0.95,
                  marginTop: 8
                }}
              >
                <div className="about-chip">
                  ✅ Open to backend / full-stack roles
                </div>
                <div className="about-chip">
                  🚀 Loves: APIs, internal tools, cloud
                </div>
                <div className="about-chip">
                  📩 Usually replies within ~24 hours
                </div>
              </div>
            </div>

            {/* Right side mini card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 30 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              style={{
                justifySelf: "center",
                width: "min(260px, 70vw)",
                borderRadius: 20,
                border: "1px solid rgba(200,200,200,0.7)",
                background:
                  "radial-gradient(circle at top, rgba(255,255,255,0.14), rgba(8,8,8,1))",
                padding: 14,
                display: "grid",
                gap: 10,
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 220deg, #e50914, #f97316, #facc15, #22c55e, #0ea5e9, #e50914)",
                  padding: 2,
                  justifySelf: "center"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "#000",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 24
                  }}
                >
                  AS
                </div>
              </div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                I like systems where you can see the impact: fewer manual steps,
                fewer “hey, this broke again” messages, more actual progress.
              </div>
            </motion.div>
          </div>
        </motion.section>
<ChatBotButton onClick={() => setBotOpen(true)} />
      <ChatBotModal open={botOpen} onClose={() => setBotOpen(false)} />
        <div className="about-divider" />

        {/* SECTION 2: HOW I WORK + SNAPSHOT */}
        <motion.section
          className="about-two-col"
          variants={sectionVariants("right")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* LEFT: How I work */}
          <div className="about-card" style={{ padding: "18px 18px 16px" }}>
            <div className="about-section-label">How I work</div>
            <h2
              style={{
                margin: 0,
                marginBottom: 8,
                fontSize: 18,
                fontFamily: "var(--font-display)"
              }}
            >
              From problem → Think → Act → clean system
            </h2>
            <p
              style={{
                margin: 0,
                marginBottom: 10,
                fontSize: 14,
                opacity: 0.9
              }}
            >
              I enjoy designing and implementing systems end-to-end: from backend
              services and APIs to frontend experiences and deployment pipelines.
              I care about clean boundaries, observability, and code that other
              people don’t hate later (Yes ! I leave comments on my code!).
            </p>
            <p
              style={{
                margin: 0,
                marginBottom: 16,
                fontSize: 14,
                opacity: 0.9
              }}
            >
              My sweet spot is making real people’s workflows smoother: dashboards
              that ops teams love, flows HR doesn’t curse at, and services that
              don’t fall over the moment traffic spikes.
            </p>

            <h3
              style={{
                margin: 0,
                marginBottom: 6,
                marginTop: 4,
                fontSize: 15,
                fontFamily: "var(--font-display)"
              }}
            >
              Things I obsess about
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 13,
                display: "grid",
                gap: 6
              }}
            >
              <li>Clear contracts between services.</li>
              <li>Good logs & metrics for when things go wrong.</li>
              <li>Simple, predictable flows for users and teammates.</li>
               <li>Anime</li>
                <li>Sleeping</li>
            </ul>
          </div>

          {/* RIGHT: Snapshot + things I’ve done */}
          <div style={{ display: "grid", gap: 14 }}>
            <div className="about-card" style={{ padding: "16px 16px 14px" }}>
              <div className="about-section-label">Snapshot</div>
              <h3
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontSize: 17,
                  fontFamily: "var(--font-display)"
                }}
              >
                At a glance
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 10
                }}
              >
                <div
                  style={{
                    padding: "10px 10px",
                    borderRadius: 12,
                    background: "rgba(10,10,10,0.95)",
                    border: "1px solid rgba(160,160,160,0.7)",
                    fontSize: 13
                  }}
                >
                  <div
                    style={{ opacity: 0.7, fontSize: 11, marginBottom: 2 }}
                  >
                    Focus
                  </div>
                  <div>Backend & APIs, Cloud, Product-driven dev</div>
                </div>
                <div
                  style={{
                    padding: "10px 10px",
                    borderRadius: 12,
                    background: "rgba(10,10,10,0.95)",
                    border: "1px solid rgba(160,160,160,0.7)",
                    fontSize: 13
                  }}
                >
                  <div
                    style={{ opacity: 0.7, fontSize: 11, marginBottom: 2 }}
                  >
                    Comfortable with
                  </div>
                  <div>Java, Spring Boot, NestJS, React, Angular</div>
                </div>
                <div
                  style={{
                    padding: "10px 10px",
                    borderRadius: 12,
                    background: "rgba(10,10,10,0.95)",
                    border: "1px solid rgba(160,160,160,0.7)",
                    fontSize: 13
                  }}
                >
                  <div
                    style={{ opacity: 0.7, fontSize: 11, marginBottom: 2 }}
                  >
                    Cloud & Ops
                  </div>
                  <div>AWS/GCP basics, CI/CD, monitoring</div>
                </div>
              </div>
            </div>

            <div className="about-card" style={{ padding: "14px 14px 12px" }}>
              <h3
                style={{
                  margin: 0,
                  marginBottom: 6,
                  fontSize: 16,
                  fontFamily: "var(--font-display)"
                }}
              >
                Things I’ve done
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 13,
                  display: "grid",
                  gap: 6
                }}
              >
                <li>
                  Helped migrate monolithic flows into microservices with cleaner
                  domain boundaries.
                </li>
                <li>Built secure auth & role-based access for internal tools.</li>
                <li>
                  Designed dashboards / UIs that make HR and ops teams move
                  faster.
                </li>
                <li>
                  Worked on a HIPAA-aligned LMS & mentor dashboard used across
                  teams.
                </li>
                <li>Just ask me!!</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: TRAVEL & MOMENTS */}
        <motion.section
          className="about-card"
          style={{ padding: "16px 16px 14px" }}
          variants={sectionVariants("left")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="about-travel-header">
            <div>
              <div className="about-section-label">Me & life</div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontFamily: "var(--font-display)"
                }}
              >
                Just a little insight 
              </h2>
            </div>
            <span
              style={{
                fontSize: 12,
                opacity: 0.75,
                maxWidth: 280
              }}
            >
              I like moving, looking around, and then coming back with ideas.
            </span>
          </div>

          <div className="about-travel-row">
            {[
              {
                src: "https://res.cloudinary.com/donpfda0m/image/upload/v1764301195/Image_23_ucgnsa.jpg",
                label: "An irritated foodie"
              },
              {
                src: "https://res.cloudinary.com/donpfda0m/image/upload/v1764301197/Image_15_rbnloe.jpg",
                label: "City walks, late evenings"
              },
              {
                src: "https://picsum.photos/seed/travel-sea/640/360",
                label: "Water, reflections, thinking"
              },
              {
                src: "https://res.cloudinary.com/donpfda0m/image/upload/v1764301198/Image_13_j8dhik.jpg",
                label: "My fav views recently"
              }
            ].map((item) => (
              <motion.figure
                key={item.src}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="about-travel-card"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    display: "block"
                  }}
                  loading="lazy"
                />
                <figcaption
                  style={{
                    padding: "8px 10px",
                    fontSize: 12,
                    opacity: 0.9
                  }}
                >
                  {item.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: TIMELINE */}
        <motion.section
          className="about-card"
          style={{ padding: "16px 16px 14px" }}
          variants={sectionVariants("right")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="about-section-label">Journey</div>
          <h2
            style={{
              margin: 0,
              marginBottom: 8,
              fontSize: 18,
              fontFamily: "var(--font-display)"
            }}
          >
            Seasons of my journey
          </h2>
          <p
            style={{
              margin: 0,
              marginBottom: 12,
              fontSize: 14,
              opacity: 0.9
            }}
          >
            Not an exhaustive resume — just the highlights that shaped how I like
            to work.
          </p>
          <div className="about-timeline-grid">
            {[
              {
                season: "Season 1",
                title: "Finding my footing",
                time: "GLA University – B.Tech CSE",
                points: [
                  "Got seriously into code, not just grades.",
                  "Built small apps / scripts for fun and friends.",
                  "Started caring about how things look, not just if they work."
                ]
              },
              {
                season: "Season 2",
                title: "First real impact",
                time: "Early work & internships",
                points: [
                  "Touched real production systems for the first time.",
                  "Learned to work with other people’s code (and not cry).",
                  "Started thinking in terms of users and teams, not just tickets."
                ]
              },
              {
                season: "Season 3",
                title: "Owning more pieces",
                time: "SDE @ Capgemini",
                points: [
                  "Worked on backend services, auth, and internal tools.",
                  "Participated in moving towards cleaner architectures.",
                  "Improved ops/HR workflows with dashboards and automation."
                ]
              },
              {
                season: "Season 4",
                title: "Playground & beyond",
                time: "Side projects / next steps",
                points: [
                  "Building tools like this portfolio and small utilities.",
                  "Exploring better ways to explain complex systems simply.",
                  "Looking for places where I can own features end-to-end."
                ]
              }
            ].map((block, idx) => (
              <motion.div
                key={block.season}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="about-timeline-card"
                style={{
                  background: "rgba(12,12,12,0.98)",
                  border:
                    "1px solid rgba(170,170,170,0.7)"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      idx % 2 === 0
                        ? "linear-gradient(to right, rgba(229,9,20,0.28), transparent)"
                        : "linear-gradient(to left, rgba(255,255,255,0.2), transparent)",
                    opacity: 0.18,
                    pointerEvents: "none"
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 0.12,
                      textTransform: "uppercase",
                      opacity: 0.7,
                      marginBottom: 2
                    }}
                  >
                    {block.season}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 2
                    }}
                  >
                    {block.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.8,
                      marginBottom: 6
                    }}
                  >
                    {block.time}
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 16,
                      display: "grid",
                      gap: 4
                    }}
                  >
                    {block.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 5: CURRENTLY / NEXT + FUN STUFF */}
        <motion.section
          className="about-split"
          variants={sectionVariants("left")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div style={{ display: "grid", gap: 14 }}>
            <div className="about-card" style={{ padding: "14px 14px 12px" }}>
              <div className="about-section-label">Now</div>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontSize: 18,
                  fontFamily: "var(--font-display)"
                }}
              >
                Currently
              </h2>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>
                Working on production systems at Capgemini, sharpening backend
                and cloud skills, and building small tools like this portfolio to
                better “tell the story” of the work.
              </p>
            </div>

            <div className="about-card" style={{ padding: "14px 14px 12px" }}>
              <div className="about-section-label">Next</div>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontSize: 18,
                  fontFamily: "var(--font-display)"
                }}
              >
                Looking ahead
              </h2>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>
                Keen on roles where I can own features end-to-end, work with
                thoughtful teams, and keep growing across backend, infra, and the
                product surface.
              </p>
            </div>
          </div>

          <div className="about-card" style={{ padding: "14px 14px 12px" }}>
            <div className="about-section-label">Off-screen</div>
            <h2
              style={{
                margin: 0,
                marginBottom: 8,
                fontSize: 18,
                fontFamily: "var(--font-display)"
              }}
            >
              Off-screen & fun stuff
            </h2>
            <p
              style={{
                margin: 0,
                marginBottom: 10,
                fontSize: 14,
                opacity: 0.9
              }}
            >
              Ohhh Boy! Here is the interesting part. I’m not only staring at logs and dashboards (most of the time 🙃):
            </p>

            <div
              style={{
                display: "grid",
                gap: 10,
                fontSize: 13
              }}
            >
              <div>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>
                  🎮 / 🎧 Games & music
                </div>
                <div style={{ opacity: 0.9 }}>
                  Casual gaming,  and occasionally
                  falling into YouTube rabbit about game lores, strange stuff and what not. 
                </div>
              </div>

              <div>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>
                  🏃‍♂️ Routines & habits
                </div>
                <div style={{ opacity: 0.9 }}>
                  Trying to balance screen time with walks, gym, and somewhat of reading — helps keep the brain from running in 100 tabs. Anyways, try Manga or maybe some Sherlock Holmes Novels. 
                </div>
              </div>

              <div>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>
                  😅 Honest confession
                </div>
                <div style={{ opacity: 0.9 }}>
                  Well, for that, ping me . Cant leave digital footprint 
                                  </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: CONTACT */}
        <motion.section
          className="about-card"
          style={{ padding: "16px 16px 14px", display: "grid", gap: 12 }}
          variants={sectionVariants("right")}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="about-section-label">Contact</div>
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: 4,
                fontSize: 18,
                fontFamily: "var(--font-display)"
              }}
            >
              Let’s connect
            </h2>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>
              Whether it’s a role, a project idea, or just to say hi — feel free
              to reach out.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 4
            }}
          >
            <a
              href="mailto:aryamanpuneetsingh@gmail.com"
              className="about-chip"
              style={{
                textDecoration: "none",
                background: "#6fcd21ff",
                borderColor: "rgba(0,0,0,0.4)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}
            >
              ✉️ Email
            </a>
            <a
            href="https://www.linkedin.com/in/aryaman-puneet-singh-382a781b7/"
              className="about-chip"
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/Aryaman9Singh"
              className="about-chip"
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            >
              🐙 GitHub
            </a>
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginTop: 4
            }}
          >
            You can also explore the{" "}
            <span style={{ opacity: 0.95 }}>Recruiter</span>,{" "}
            <span style={{ opacity: 0.95 }}>Development</span>, and{" "}
            <span style={{ opacity: 0.95 }}>Misc</span> profiles for project-
            focused views of my work.
          </div>
        </motion.section>
      </main>
    </div>
  );
}
