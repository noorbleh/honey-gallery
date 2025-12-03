"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ---------------------- ARTWORKS ----------------------
const artworks = [
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680796/IMG_20251130_000643_hfs8vc.png",
    title: "Quiet Structure",
    desc: "A minimalist, expressive wall composition exploring balance and abstract contrast.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680804/IMG_20251130_000440_exhuyp.png",
    title: "Chromatic Flow",
    desc: "A vibrant flow of layered colors, depth, and playful abstract form.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680815/IMG_20251130_000458_kl8lyy.png",
    title: "Color Burst",
    desc: "A bold color-focused artwork showcasing striking contrasts and energy.",
  },
];

export default function WallCollection() {
  const [audioOn, setAudioOn] = useState(false);

  // scroll parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -120]);

  // spotlight cursor
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // stop audio on leave
  useEffect(() => {
    return () => {
      const audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;
      if (audio) audio.pause();
    };
  }, []);

  const toggleAmbient = () => {
    setAudioOn((prev) => {
      const next = !prev;

      let audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;

      if (!audio) {
        audio = document.createElement("audio");
        audio.src = "https://res.cloudinary.com/doqshkcln/raw/upload/v1764772522/ambient_obqtzy.mp3";
        audio.id = "ambient-audio";
        audio.loop = true;
        audio.volume = 0.17;
        document.body.appendChild(audio);
      }

      next ? audio.play().catch(() => {}) : audio.pause();
      return next;
    });
  };

  return (
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

      {/* ---------------- DUST LAYER ---------------- */}
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
          Wall Collection
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
          A bold, expressive series of wall artworks filled with texture and depth.
        </motion.p>

        {/* Ambient Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          onClick={toggleAmbient}
          style={{
            margin: "28px auto 0",
            display: "block",
            padding: "12px 36px",
            borderRadius: "30px",
            border: "none",
            background: audioOn ? "#3c3029" : "#8b7a70",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            fontFamily: "Playfair Display, serif",
            boxShadow: "0 5px 16px rgba(0,0,0,0.26)",
          }}
        >
          {audioOn ? "Ambient: ON" : "Ambient: OFF"}
        </motion.button>
      </motion.div>

      {/* ---------------- ARTWORK SECTIONS ---------------- */}
      <div style={{ marginTop: "40px", zIndex: 2, position: "relative" }}>
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
                whileHover={{ scale: 1.04, rotate: index % 2 ? -1 : 1 }}
                transition={{ duration: 0.8 }}
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isFirst ? { opacity: 1, x: 0 } : undefined}
                whileInView={isFirst ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}
                viewport={{ once: true }}
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
          background: radial-gradient(circle, transparent 65%, rgba(0, 0, 0, 0.15));
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
      `}</style>
    </div>
  );
}