"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ⭐ Define artwork type so TS stops crying
export interface Artwork {
  id: number;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  collection: string;
}

interface Props {
  artwork: Artwork;
  reverse?: boolean;
}

export default function CinematicSection({ artwork, reverse = false }: Props) {
  const ref = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"],
  });

  const fadeIn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const slide = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [200, 0] : [-200, 0]
  );
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: reverse ? "flex-end" : "flex-start",
        padding: "0 8%",
        overflow: "hidden",
      }}
    >
      {/* Background Parallax Image */}
      <motion.img
        src={artwork.imageUrl}
        alt={artwork.title}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "75%",
          height: "75%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          y: parallax,
          opacity: fadeIn,
          filter: "brightness(0.95)",
          borderRadius: "20px",
        }}
      />

      {/* Text Panel */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          width: "40%",
          maxWidth: "450px",
          opacity: fadeIn,
          x: slide,
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "46px",
            marginBottom: "12px",
          }}
        >
          {artwork.title}
        </h1>

        <h3 style={{ opacity: 0.6, marginBottom: "20px" }}>{artwork.year}</h3>

        <p style={{ lineHeight: 1.6, fontSize: "18px" }}>
          {artwork.description}
        </p>
      </motion.div>
    </section>
  );
}
