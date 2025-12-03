"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ---------------------- PHOTOS ----------------------
const photos = [
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764687488/PXL_20250707_133534385.PORTRAIT_wzakpm.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764687488/Screenshot_2025-11-29-17-35-12-573_com.android.chrome_jz9yjp.png" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524639/photo_vtm4oo.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764520442/photographycover_rfaobc.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-01-10-38-747-edit_com.instagram.android_tm8xlf.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/IMG_20251203_011801_gr7ndl.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-00-56-03-397-edit_com.instagram.android_sam4cr.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-00-55-35-514-edit_com.instagram.android_yjexfb.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706603/IMG-20250330-WA0040_zt2lku.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706690/Screenshot_2025-12-03-01-09-31-279-edit_com.instagram.android_znvba4.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706691/Screenshot_2025-12-03-01-10-20-916-edit_com.instagram.android_ewwzn7.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706690/IMG_20251203_011539_agigqu.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706691/Screenshot_2025-12-03-00-54-04-643-edit_com.instagram.android_kqjoun.jpg" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706692/Screenshot_2025-12-03-01-00-04-260_com.google.android.apps.photos_whqhpp.png" },
  { url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764706741/Screenshot_2025-12-03-01-11-04-141-edit_com.instagram.android_sv6icn.jpg" },
];

export default function PhotographyPage() {
  const [audioOn, setAudioOn] = useState(false);

  // HERO PARALLAX
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -120]);

  // CURSOR SPOTLIGHT
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // AMBIENT AUDIO
  const toggleAmbient = () => {
    setAudioOn((prev) => {
      const next = !prev;
      let audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;
      if (!audio) {
        audio = document.createElement("audio");
        audio.src = "/ambient.mp3";
        audio.id = "ambient-audio";
        audio.loop = true;
        audio.volume = 0.18;
        document.body.appendChild(audio);
      }
      next ? audio.play().catch(() => {}) : audio.pause();
      return next;
    });
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      
      {/* SPOTLIGHT CURSOR */}
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          zIndex: 4,
          background: `radial-gradient(
            350px at ${cursor.x}px ${cursor.y}px,
            rgba(255,255,255,0.13),
            transparent 70%
          )`,
        }}
      />

      {/* FLOATING PARTICLES */}
      <div className="particles"></div>

      {/* HERO */}
      <motion.div
        style={{
          y: heroY,
          paddingTop: "150px",
          paddingBottom: "40px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          style={{
            textAlign: "center",
            fontSize: "90px",
            fontFamily: "Playfair Display, serif",
            letterSpacing: "2px",
            background:
              "linear-gradient(90deg,#3c3029,#a69283,#3c3029,#c8b8a8)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundSize: "300%",
            animation: "goldShimmer 8s linear infinite",
          }}
        >
          Photography
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          onClick={toggleAmbient}
          style={{
            margin: "30px auto 0",
            display: "block",
            padding: "12px 36px",
            borderRadius: "30px",
            border: "1.5px solid #3c3029",
            background: "transparent",
            color: "#3c3029",
            fontSize: "18px",
            cursor: "pointer",
            fontFamily: "Playfair Display, serif",
            boxShadow: "0 5px 18px rgba(0,0,0,0.16)",
          }}
        >
          Ambient Sound: {audioOn ? "ON" : "OFF"}
        </motion.button>
      </motion.div>

      {/* IMAGE GALLERY */}
      <div style={{ marginTop: "40px", paddingBottom: "140px" }}>
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 140, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.25 }}
            style={{
              marginBottom: "140px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.img
              src={p.url}
              initial={{ x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                width: "55%",
                borderRadius: "22px",
                boxShadow: "0 28px 70px rgba(0,0,0,0.28)",
                objectFit: "cover",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        .particles {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 1;
          background-image: url("https://res.cloudinary.com/doqshkcln/image/upload/v1700000000/dust_texture_hq.png");
          opacity: 0.17;
          animation: floatParticles 45s linear infinite;
        }

        @keyframes floatParticles {
          from { transform: translate(0, 0); }
          to { transform: translate(-280px, -240px); }
        }

        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
}