"use client";

import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

interface Artwork {
  title: string;
  year: string;
  description: string;
  imageUrl: string;
}

export default function ParallaxSection({
  artwork,
  reverse = false,
}: {
  artwork: Artwork;
  reverse?: boolean;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        gap: "60px",
        padding: "120px 10%",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* IMAGE */}
      <Parallax speed={-10} style={{ flex: 1, minWidth: "300px" }}>
        <motion.img
          src={artwork.imageUrl}
          alt={artwork.title}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          }}
        />
      </Parallax>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        style={{
          flex: 1,
          minWidth: "300px",
          fontFamily: "Playfair Display, serif",
        }}
      >
        <h2 style={{ fontSize: "42px", marginBottom: "12px" }}>
          {artwork.title}
        </h2>
        <p style={{ opacity: 0.7, marginBottom: "18px", fontSize: "18px" }}>
          {artwork.year}
        </p>
        <p
          style={{
            lineHeight: "1.7",
            fontSize: "18px",
            color: "#3a3a3a",
          }}
        >
          {artwork.description}
        </p>
      </motion.div>
    </section>
  );
}
