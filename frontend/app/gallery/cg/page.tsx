"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ---------------------- ARTWORKS ----------------------
const artworks = [
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764520476/IMG_20251130_000631_rvn86g.png",
    title: "Graphite Study I",
    desc: "A raw exploration of light, texture, and silence.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524640/3_rsibnk.jpg",
    title: "Portrait in Shadow",
    desc: "Minimalist portrait work capturing emotion through contrast.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524674/IMG_20251130_000515_wgrjlf.png",
    title: "Stillness",
    desc: "A graphite rendering focusing on balance and calm.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524680/IMG_20251130_000546_kyjzrp.png",
    title: "Soft Gaze",
    desc: "Gentle tones and line-work forming subtle emotion.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524680/IMG_20251130_000605_lltnn8.png",
    title: "Charcoal Flow",
    desc: "Organic strokes creating movement within stillness.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524681/IMG_20251130_000534_vuzeuq.png",
    title: "Contours",
    desc: "Shading technique study highlighting depth and texture.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524693/1_lmubtn.png",
    title: "Graphite Study II",
    desc: "Elegant detail and handcrafted precision.",
  },
];

export default function CgCollection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -120]);

  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* ---------------- BACK TO GALLERY ---------------- */}
      <div
        style={{
          position: "fixed",
          top: "40px",
          left: "6%",
          zIndex: 50,
        }}
      >
        <Link
          href="/gallery"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#3c3029",
            fontFamily: "Playfair Display, serif",
            fontSize: "16px",
            textDecoration: "none",
            opacity: 0.85,
            transition: "0.3s",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3c3029"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </Link>
      </div>

      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* ---------------- SPOTLIGHT ---------------- */}
        <div
          style={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: `radial-gradient(
              350px at ${cursor.x}px ${cursor.y}px,
              rgba(255,255,255,0.12),
              transparent 70%
            )`,
            transition: "background 0.15s ease-out",
            zIndex: 1,
          }}
        />

        {/* ---------------- DUST ---------------- */}
        <div className="dust-layer" />

        {/* ---------------- HERO ---------------- */}
        <motion.div
          style={{
            y: heroY,
            paddingTop: "120px",
            paddingBottom: "60px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              textAlign: "center",
              fontSize: "78px",
              fontFamily: "Playfair Display, serif",
              letterSpacing: "1px",
              background:
                "linear-gradient(90deg,#3c3029,#a69283,#3c3029,#c8b8a8)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundSize: "300%",
              animation: "goldShimmer 7s linear infinite",
            }}
          >
            C&amp;G Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            style={{
              textAlign: "center",
              marginTop: "14px",
              fontSize: "24px",
              color: "#3c3029",
              fontFamily: "Playfair Display, serif",
            }}
          >
            A premium series of graphite artworks crafted with precision and emotion.
          </motion.p>
        </motion.div>

        {/* ---------------- ARTWORKS ---------------- */}
        <div style={{ marginTop: "40px", position: "relative", zIndex: 2 }}>
          {artworks.map((art, index) => {
            const isFirst = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isFirst ? 0 : 80 }}
                animate={isFirst ? { opacity: 1, y: 0 } : undefined}
                whileInView={isFirst ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                viewport={{ once: true }}
                className="art-row"
                style={{
                  display: "flex",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  gap: "40px",
                  alignItems: "center",
                  padding: "0 10%",
                  marginBottom: "140px",
                }}
              >
                {/* IMAGE */}
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    rotate: index % 2 ? -1 : 1,
                  }}
                  transition={{ duration: 0.8 }}
                  className="art-image"
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    borderRadius: "18px",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  <motion.img
                    src={art.url}
                    alt={art.title}
                    style={{
                      width: "100%",
                      height: "750px",
                      objectFit: "cover",
                    }}
                    whileHover={{ scale: 1.14 }}
                    transition={{ duration: 1.15 }}
                  />
                </motion.div>

                {/* TEXT */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                  }}
                  animate={isFirst ? { opacity: 1, x: 0 } : undefined}
                  whileInView={
                    isFirst ? undefined : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 1.3 }}
                  viewport={{ once: true }}
                  className="art-text"
                  style={{ flex: 1 }}
                >
                  <h2
                    style={{
                      fontSize: "42px",
                      fontFamily: "Playfair Display, serif",
                      marginBottom: "16px",
                      color: "#3c3029",
                    }}
                  >
                    {art.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "19px",
                      lineHeight: 1.7,
                      opacity: 0.75,
                      maxWidth: "520px",
                      color: "#3c3029",
                    }}
                  >
                    {art.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------- GLOBAL STYLES ---------------- */}
        <style jsx global>{`
          body::after {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(
              circle,
              transparent 65%,
              rgba(0, 0, 0, 0.15)
            );
            z-index: 0;
          }

          .dust-layer {
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 1;
            background-image: url("https://i.imgur.com/hfHWlZc.png");
            opacity: 0.22;
            mix-blend-mode: screen;
            animation: dustMove 35s linear infinite;
          }

          @keyframes dustMove {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(-300px, -200px);
            }
          }

          @keyframes goldShimmer {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 300% 50%;
            }
          }

          /* -------- MOBILE FIX (ANIMATIONS PRESERVED) -------- */
          @media (max-width: 768px) {
            .art-row {
              flex-direction: column !important;
              padding: 0 6% !important;
            }

            .art-image img {
              height: auto !important;
            }

            .art-text {
              text-align: center;
            }

            .art-text p {
              max-width: 100%;
            }
          }
        `}</style>
      </div>
    </>
  );
}
