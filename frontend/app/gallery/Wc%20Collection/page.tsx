"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ---------------------- ARTWORKS ----------------------
const artworks = [
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764686042/IMG_20251201_023159_ebsloc.jpg",
    title: "Warm Portrait",
    desc: "A soft, emotionally rich oil portrait with warm tones and gentle structure.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764686039/Screenshot_2025-12-02_at_8.03.08_PM_zluihx.png",
    title: "Golden Evening",
    desc: "A dreamy evening composition blending golden hues with expressive brushwork.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764520966/IMG_20251129_175809_ezvcog.jpg",
    title: "Soft Oil Study",
    desc: "A tranquil oil painting study focusing on subtle gradients and calm textures.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764686056/IMG_20251129_175220_gxnogi.png",
    title: "Crimson Bloom",
    desc: "A bold and expressive oil work featuring depth, color, and organic movement.",
  },
];

export default function WcCollection() {
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
    <div style={{ position: "relative", overflow: "hidden" }}>
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
          zIndex: 1,
        }}
      />

      {/* ---------------- DUST ---------------- */}
      <div className="dust-layer" />

      {/* ---------------- HERO ---------------- */}
      <motion.div
        style={{
          y: heroY,
          paddingTop: "140px",
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
          Wc Collection
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
          A premium selection of expressive oil artworks.
        </motion.p>
      </motion.div>

      {/* ---------------- ARTWORKS ---------------- */}
      <div style={{ marginTop: "40px", zIndex: 2, position: "relative" }}>
        {artworks.map((art, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: true }}
            className="art-row"
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "center",
              padding: "0 10%",
              marginBottom: "140px",
            }}
          >
            {/* IMAGE */}
            <motion.div
              whileHover={{ scale: 1.04 }}
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
                whileHover={{ scale: 1.14 }}
                transition={{ duration: 1.15 }}
                style={{
                  width: "100%",
                  height: "650px",
                  objectFit: "cover",
                }}
              />
            </motion.div>

            {/* TEXT */}
            <motion.div className="art-text" style={{ flex: 1 }}>
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
        ))}
      </div>

      {/* ---------------- GLOBAL STYLES ---------------- */}
      <style jsx global>{`
        body::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle, transparent 65%, rgba(0,0,0,0.15));
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
          from { transform: translate(0, 0); }
          to { transform: translate(-300px, -200px); }
        }

        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* -------- MOBILE FIX -------- */
        @media (max-width: 768px) {
          .art-row {
            flex-direction: column !important;
            padding: 0 6% !important;
          }

          .art-image img {
            height: auto !important;
          }

          .art-text {
            margin-top: 20px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
